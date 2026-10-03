import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { DriverOnboarding } from '../contracts/driver-onboarding';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { OnboardDriverUseCase } from './onboard-driver.use-case';

describe('OnboardDriverUseCase', () => {
  const now = new Date('2026-10-02T12:00:00.000Z');
  const profile = (
    status = DriverStatus.PENDING_ONBOARDING,
    vehicle: Vehicle | null = null,
  ) =>
    new DriverProfile({
      id: 'driver-profile-id',
      userId: 'driver-user-id',
      status,
      vehicle,
      createdAt: now,
      updatedAt: now,
    });
  const command = {
    userId: 'driver-user-id',
    type: VehicleType.SEDAN,
    make: 'Toyota',
    model: 'Corolla',
    color: 'Silver',
    year: 2022,
    licensePlate: 'LAG-123-AB',
  };

  function createUseCase(
    currentProfile: DriverProfile | null,
    plateTaken = false,
  ) {
    const profiles: DriverProfileRepository = {
      findById: async () => null,
      findByUserId: async () => currentProfile,
    };
    const vehicles: VehicleRepository = {
      findById: async () => null,
      findByDriverProfileId: async () => null,
      findByLicensePlate: async () =>
        plateTaken ? vehicleFor(currentProfile!.id) : null,
    };
    let persisted: DriverProfile | null = null;
    const onboarding: DriverOnboarding = {
      onboard: async ({ profile: updatedProfile }) => {
        persisted = updatedProfile;
        return updatedProfile;
      },
    };
    return {
      useCase: new OnboardDriverUseCase(profiles, vehicles, onboarding),
      persisted: () => persisted,
    };
  }

  function vehicleFor(driverProfileId: string): Vehicle {
    return Vehicle.register({
      id: 'vehicle-id',
      driverProfileId,
      type: VehicleType.SEDAN,
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2022,
      licensePlate: 'LAG-123-AB',
      createdAt: now,
      updatedAt: now,
    });
  }

  it('activates a pending profile with one vehicle and keeps it unavailable', async () => {
    const setup = createUseCase(profile());
    const result = await setup.useCase.execute(command);

    expect(result).toMatchObject({
      status: DriverStatus.ACTIVE,
      vehicle: expect.objectContaining({ licensePlate: command.licensePlate }),
    });
    expect(setup.persisted()?.toSafeObject()).toEqual(result);
  });

  it('rejects missing profiles, duplicate plates, and ineligible profiles before persistence', async () => {
    await expect(
      createUseCase(null).useCase.execute(command),
    ).rejects.toMatchObject({
      kind: ERROR_KINDS.NOT_FOUND,
      message: ERROR_MESSAGES.NOT_FOUND('Driver profile'),
    });

    const duplicate = createUseCase(profile(), true);
    await expect(duplicate.useCase.execute(command)).rejects.toMatchObject({
      kind: ERROR_KINDS.CONFLICT,
    });
    expect(duplicate.persisted()).toBeNull();

    const active = createUseCase(profile(DriverStatus.ACTIVE));
    await expect(active.useCase.execute(command)).rejects.toMatchObject({
      kind: ERROR_KINDS.CONFLICT,
    });
    expect(active.persisted()).toBeNull();
  });
});
