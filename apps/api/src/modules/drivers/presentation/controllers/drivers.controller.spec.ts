import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { configureApplication } from '@/app-setup';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { AccessTokenService } from '../../../identity/application/contracts/access-token.service';
import { UserRole } from '../../../identity/domain/enums/user-role.enum';
import { IdentityModule } from '../../../identity/identity.module';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';
import {
  OnboardDriverCommand,
  OnboardDriverUseCase,
} from '../../application/use-cases/onboard-driver.use-case';

describe('DriversController', () => {
  let app: INestApplication;
  let baseUrl: string;
  const commands: OnboardDriverCommand[] = [];
  const driver = {
    id: 'ecaf19b2-0c57-46a3-9d04-8d7f350796cb',
    email: 'driver@example.com',
    passwordHash: 'not-returned',
    firstName: 'Driver',
    lastName: 'One',
    phoneNumber: null,
    role: UserRole.DRIVER,
    status: 'ACTIVE',
    createdAt: new Date('2026-10-02T12:00:00.000Z'),
    updatedAt: new Date('2026-10-02T12:00:00.000Z'),
  };

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
                jwtSecret: 'drivers-controller-test-secret',
                jwtExpiresIn: '1h',
              },
            }),
          ],
        }),
        IdentityModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({ user: { findUnique: async () => driver } })
      .overrideProvider(OnboardDriverUseCase)
      .useValue({
        execute: async (command: OnboardDriverCommand) => {
          commands.push(command);
          return {
            id: 'profile-id',
            userId: command.userId,
            status: DriverStatus.ACTIVE,
            vehicle: {
              id: 'vehicle-id',
              driverProfileId: 'profile-id',
              type: command.type,
              make: command.make,
              model: command.model,
              color: command.color,
              year: command.year,
              licensePlate: command.licensePlate,
              createdAt: new Date('2026-10-02T12:00:00.000Z'),
              updatedAt: new Date('2026-10-02T12:00:00.000Z'),
            },
            createdAt: new Date('2026-10-02T12:00:00.000Z'),
            updatedAt: new Date('2026-10-02T12:00:00.000Z'),
          };
        },
      })
      .compile();
    app = module.createNestApplication({ logger: false });
    configureApplication(app);
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
  });

  afterAll(async () => {
    await app?.close();
  });

  async function headers() {
    const token = await app.get(AccessTokenService).issue({
      sub: driver.id,
      role: UserRole.DRIVER,
    });
    return {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };
  }

  it('onboards the authenticated driver at the vehicle route', async () => {
    const response = await fetch(`${baseUrl}/api/v1/drivers/onboarding`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({
        type: VehicleType.SEDAN,
        make: ' Toyota ',
        model: ' Corolla ',
        color: ' Silver ',
        year: 2022,
        licensePlate: 'lag 123 ab',
      }),
    });

    expect(response.status).toBe(201);
    expect(commands).toEqual([
      expect.objectContaining({
        userId: driver.id,
        make: 'Toyota',
        model: 'Corolla',
        color: 'Silver',
        licensePlate: 'LAG-123-AB',
      }),
    ]);
    expect(await response.json()).toMatchObject({
      status: DriverStatus.ACTIVE,
      vehicle: { licensePlate: 'LAG-123-AB' },
    });
  });

  it('rejects invalid fields before invoking onboarding', async () => {
    const response = await fetch(`${baseUrl}/api/v1/drivers/onboarding`, {
      method: 'POST',
      headers: await headers(),
      body: JSON.stringify({
        type: VehicleType.SEDAN,
        make: 'Toyota',
        model: 'Corolla',
        color: 'Silver',
        licensePlate: 'LAG-123-AB',
        status: DriverStatus.ACTIVE,
      }),
    });

    expect(response.status).toBe(400);
    expect(commands).toHaveLength(1);
  });
});
