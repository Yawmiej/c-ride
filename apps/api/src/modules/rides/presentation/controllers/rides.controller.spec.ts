import { ConfigModule } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { configureApplication } from '@/app-setup';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { AccessTokenService } from '../../../identity/application/contracts/access-token.service';
import { UserRole } from '../../../identity/domain/enums/user-role.enum';
import { IdentityModule } from '../../../identity/identity.module';
import { CreateRideUseCase } from '../../application/use-cases/create-ride.use-case';
import { GetRideUseCase } from '../../application/use-cases/get-ride.use-case';
import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { RidesModule } from '../../rides.module';

describe('RidesController', () => {
  let app: INestApplication;
  let baseUrl: string;
  let tokens: AccessTokenService;
  const riderId = '11111111-1111-4111-8111-111111111111';
  const driverId = '22222222-2222-4222-8222-222222222222';
  const otherId = '33333333-3333-4333-8333-333333333333';
  const rideId = '44444444-4444-4444-8444-444444444444';
  const missingRideId = '55555555-5555-4555-8555-555555555555';
  const createCommands: unknown[] = [];
  const getCommands: unknown[] = [];
  const ride = new Ride({
    id: rideId,
    riderId,
    driverId,
    status: RideStatus.REQUESTED,
    pickupLat: 6.5244,
    pickupLng: 3.3792,
    dropoffLat: 6.6018,
    dropoffLng: 3.3515,
    fare: '1000.00',
    createdAt: new Date('2026-10-02T12:00:00.000Z'),
    updatedAt: new Date('2026-10-02T12:00:00.000Z'),
  });
  const users = new Map([
    [riderId, { id: riderId, role: UserRole.RIDER, status: 'ACTIVE' }],
    [driverId, { id: driverId, role: UserRole.DRIVER, status: 'ACTIVE' }],
    [otherId, { id: otherId, role: UserRole.RIDER, status: 'ACTIVE' }],
  ]);

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [
            () => ({
              auth: {
                jwtSecret: 'rides-controller-test-secret',
                jwtExpiresIn: '1h',
              },
            }),
          ],
        }),
        IdentityModule,
        RidesModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({
        driverProfile: { findUnique: async () => null },
        user: {
          findUnique: async ({ where }: { where: { id: string } }) =>
            users.get(where.id) ?? null,
        },
      })
      .overrideProvider(CreateRideUseCase)
      .useValue({
        execute: async (command: unknown) => {
          createCommands.push(command);
          return ride;
        },
      })
      .overrideProvider(GetRideUseCase)
      .useValue({
        execute: async (command: { rideId: string; actorId: string }) => {
          getCommands.push(command);
          if (command.rideId === missingRideId) {
            throw new ApplicationError(
              ERROR_KINDS.NOT_FOUND,
              ERROR_MESSAGES.NOT_FOUND('Ride'),
            );
          }
          if (command.actorId === otherId) {
            throw new ApplicationError(
              ERROR_KINDS.FORBIDDEN,
              ERROR_MESSAGES.RIDE_ACCESS_FORBIDDEN,
            );
          }
          return ride;
        },
      })
      .compile();
    app = module.createNestApplication({ logger: false });
    configureApplication(app);
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
    tokens = app.get(AccessTokenService);
  });

  afterAll(async () => app?.close());

  async function headers(id: string, role: UserRole) {
    return {
      authorization: `Bearer ${await tokens.issue({ sub: id, role })}`,
      'content-type': 'application/json',
    };
  }

  it('creates a ride for the authenticated rider only', async () => {
    const response = await fetch(`${baseUrl}/api/v1/rides`, {
      method: 'POST',
      headers: await headers(riderId, UserRole.RIDER),
      body: JSON.stringify({
        pickupLat: 6.5244,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      }),
    });

    expect(response.status).toBe(201);
    expect(createCommands).toEqual([
      {
        riderId,
        pickupLat: 6.5244,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      },
    ]);
    expect(await response.json()).toMatchObject({
      id: rideId,
      riderId,
      driverId,
      fare: '1000.00',
    });
  });

  it('rejects non-riders and client-controlled ride fields', async () => {
    const driverResponse = await fetch(`${baseUrl}/api/v1/rides`, {
      method: 'POST',
      headers: await headers(driverId, UserRole.DRIVER),
      body: JSON.stringify({
        pickupLat: 6.5244,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      }),
    });
    expect(driverResponse.status).toBe(403);

    const invalidResponse = await fetch(`${baseUrl}/api/v1/rides`, {
      method: 'POST',
      headers: await headers(riderId, UserRole.RIDER),
      body: JSON.stringify({
        pickupLat: 6.5244,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
        fare: '1.00',
      }),
    });
    expect(invalidResponse.status).toBe(400);
    expect(createCommands).toHaveLength(1);
  });

  it('returns a ride to its rider and assigned driver', async () => {
    const riderResponse = await fetch(`${baseUrl}/api/v1/rides/${rideId}`, {
      headers: await headers(riderId, UserRole.RIDER),
    });
    const driverResponse = await fetch(`${baseUrl}/api/v1/rides/${rideId}`, {
      headers: await headers(driverId, UserRole.DRIVER),
    });

    expect(riderResponse.status).toBe(200);
    expect(driverResponse.status).toBe(200);
    expect(getCommands).toEqual([
      { rideId, actorId: riderId },
      { rideId, actorId: driverId },
    ]);
  });

  it('returns 400, 401, 403, and 404 for invalid lookup requests', async () => {
    expect(
      (
        await fetch(`${baseUrl}/api/v1/rides/not-a-uuid`, {
          headers: await headers(riderId, UserRole.RIDER),
        })
      ).status,
    ).toBe(400);
    expect((await fetch(`${baseUrl}/api/v1/rides/${rideId}`)).status).toBe(401);
    expect(
      (
        await fetch(`${baseUrl}/api/v1/rides/${rideId}`, {
          headers: await headers(otherId, UserRole.RIDER),
        })
      ).status,
    ).toBe(403);
    expect(
      (
        await fetch(`${baseUrl}/api/v1/rides/${missingRideId}`, {
          headers: await headers(riderId, UserRole.RIDER),
        })
      ).status,
    ).toBe(404);
  });
});
