import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';
import { configureApplication } from '@/app-setup';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { AccessTokenService } from '../identity/application/contracts/access-token.service';
import { UserRole } from '../identity/domain/enums/user-role.enum';
import { RideRepository } from './domain/repositories/ride.repository';
import { RidesModule } from './rides.module';

const databaseTests =
  process.env.RUN_DATABASE_TESTS === '1' ? describe : describe.skip;

databaseTests('Ride acceptance with PostgreSQL', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let baseUrl: string;
  const riderId = randomUUID();
  const driverIds = [randomUUID(), randomUUID()];
  const rideId = randomUUID();
  const userIds = [riderId, ...driverIds];

  beforeAll(async () => {
    config({ quiet: true });
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              database: { url: process.env.DATABASE_URL },
              auth: {
                jwtSecret: 'ride-acceptance-integration-secret',
                jwtExpiresIn: '1h',
              },
            }),
          ],
        }),
        RidesModule,
      ],
    }).compile();
    app = module.createNestApplication({ logger: false });
    configureApplication(app);
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
    prisma = app.get(PrismaService);

    await prisma.user.create({
      data: {
        id: riderId,
        email: `acceptance-${riderId}@example.com`,
        passwordHash: 'unused-integration-fixture',
        firstName: 'Test',
        lastName: 'Rider',
        role: 'RIDER',
      },
    });
    for (const driverId of driverIds) {
      await prisma.user.create({
        data: {
          id: driverId,
          email: `acceptance-${driverId}@example.com`,
          passwordHash: 'unused-integration-fixture',
          firstName: 'Test',
          lastName: 'Driver',
          role: 'DRIVER',
          driverProfile: {
            create: {
              status: 'ACTIVE',
              vehicle: {
                create: {
                  type: 'SEDAN',
                  make: 'Toyota',
                  model: 'Corolla',
                  color: 'Black',
                  licensePlate: `TEST-${driverId}`,
                },
              },
            },
          },
        },
      });
    }
    await prisma.ride.create({
      data: {
        id: rideId,
        riderId,
        pickupLat: 6.5,
        pickupLng: 3.3,
        dropoffLat: 6.6,
        dropoffLng: 3.4,
        fare: '1000.00',
      },
    });
  }, 30000);

  afterAll(async () => {
    try {
      if (prisma) {
        await prisma.ride.deleteMany({ where: { id: rideId } });
        await prisma.user.deleteMany({ where: { id: { in: userIds } } });
      }
    } finally {
      await app?.close();
    }
  });

  it('allows exactly one driver to accept and returns 409 to the loser', async () => {
    const tokens = app.get(AccessTokenService);
    const accessTokens = await Promise.all(
      driverIds.map((id) => tokens.issue({ sub: id, role: UserRole.DRIVER })),
    );
    const rides = app.get(RideRepository);
    const findById = rides.findById.bind(rides);
    let arrivals = 0;
    let release!: () => void;
    const bothRead = new Promise<void>((resolve) => {
      release = resolve;
    });

    // Both requests must read REQUESTED before either proceeds to persistence.
    // The database reads, transactions, and HTTP guards remain real.
    rides.findById = async (id) => {
      const ride = await findById(id);
      arrivals += 1;
      if (arrivals === 2) release();
      await bothRead;
      return ride;
    };

    try {
      const responses = await Promise.all(
        accessTokens.map((token) =>
          fetch(`${baseUrl}/api/v1/rides/${rideId}/accept`, {
            method: 'PATCH',
            headers: { authorization: `Bearer ${token}` },
          }),
        ),
      );
      expect(responses.map((response) => response.status).sort()).toEqual([
        200, 409,
      ]);
      expect(arrivals).toBe(2);

      const winnerIndex = responses.findIndex(
        (response) => response.status === 200,
      );
      const winner = responses[winnerIndex]!;
      const loser = responses.find((response) => response.status === 409)!;
      const winnerBody = await winner.json();
      expect(winnerBody).toMatchObject({
        id: rideId,
        driverId: driverIds[winnerIndex],
        status: 'ACCEPTED',
      });
      expect(JSON.stringify(winnerBody)).not.toMatch(/passwordHash|props/);
      expect(await loser.json()).toMatchObject({
        statusCode: 409,
        message: ERROR_MESSAGES.RIDE_UNAVAILABLE,
      });
      expect(
        await prisma.ride.findUniqueOrThrow({ where: { id: rideId } }),
      ).toMatchObject({
        driverId: driverIds[winnerIndex],
        status: 'ACCEPTED',
      });
    } finally {
      release();
      rides.findById = findById;
    }
  }, 30000);
});
