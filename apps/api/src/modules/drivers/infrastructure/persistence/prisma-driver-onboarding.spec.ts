import { Prisma } from '@/generated/prisma';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { DriverOnboardingConflictError } from '../../domain/errors/driver-onboarding-conflict.error';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';
import { PrismaDriverOnboarding } from './prisma-driver-onboarding';

describe('PrismaDriverOnboarding', () => {
  const now = new Date('2026-10-02T12:00:00.000Z');
  const vehicle = Vehicle.register({
    id: 'vehicle-id',
    driverProfileId: 'profile-id',
    type: VehicleType.SEDAN,
    make: 'Toyota',
    model: 'Corolla',
    color: 'Silver',
    year: 2022,
    licensePlate: 'LAG-123-AB',
    createdAt: now,
    updatedAt: now,
  });
  const profile = new DriverProfile({
    id: 'profile-id',
    userId: 'user-id',
    status: DriverStatus.ACTIVE,
    isAvailable: false,
    vehicle,
    createdAt: now,
    updatedAt: now,
  });

  it('rejects a competing onboarding before creating another vehicle', async () => {
    let created = false;
    const prisma = {
      $transaction: async (
        callback: (transaction: {
          driverProfile: { updateMany: () => Promise<{ count: number }> };
          vehicle: { create: () => Promise<never> };
        }) => Promise<unknown>,
      ) =>
        callback({
          driverProfile: { updateMany: async () => ({ count: 0 }) },
          vehicle: {
            create: async () => {
              created = true;
              throw new Error('Vehicle must not be created');
            },
          },
        }),
    } as unknown as PrismaService;

    await expect(
      new PrismaDriverOnboarding(prisma).onboard({ profile, vehicle }),
    ).rejects.toBeInstanceOf(DriverOnboardingConflictError);
    expect(created).toBe(false);
  });

  it('translates a unique plate race from the transaction to a conflict', async () => {
    const prisma = {
      $transaction: async (
        callback: (transaction: {
          driverProfile: { updateMany: () => Promise<{ count: number }> };
          vehicle: { create: () => Promise<never> };
        }) => Promise<unknown>,
      ) =>
        callback({
          driverProfile: { updateMany: async () => ({ count: 1 }) },
          vehicle: {
            create: async () => {
              throw new Prisma.PrismaClientKnownRequestError(
                'Duplicate plate',
                {
                  code: 'P2002',
                  clientVersion: '7.10.0',
                },
              );
            },
          },
        }),
    } as unknown as PrismaService;

    await expect(
      new PrismaDriverOnboarding(prisma).onboard({ profile, vehicle }),
    ).rejects.toBeInstanceOf(DriverOnboardingConflictError);
  });
});
