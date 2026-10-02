import { DriverProfile } from './driver-profile.entity';
import { Vehicle } from './vehicle.entity';
import { DriverStatus } from '../enums/driver-status.enum';
import { VehicleType } from '../enums/vehicle-type.enum';

describe('DriverProfile', () => {
  const now = new Date('2026-10-02T12:00:00.000Z');

  it('models at most one vehicle and requires it to belong to the profile', () => {
    const vehicle = new Vehicle({
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
      status: DriverStatus.PENDING_ONBOARDING,
      vehicle,
      createdAt: now,
      updatedAt: now,
    });

    expect(profile.hasVehicle()).toBe(true);
    expect(profile.toSafeObject().vehicle).toEqual(vehicle.toSafeObject());
  });

  it('rejects a vehicle assigned to another profile', () => {
    const vehicle = new Vehicle({
      id: 'vehicle-id',
      driverProfileId: 'other-profile-id',
      type: VehicleType.SEDAN,
      make: 'Toyota',
      model: 'Corolla',
      color: 'Silver',
      year: 2022,
      licensePlate: 'LAG-123-AB',
      createdAt: now,
      updatedAt: now,
    });

    expect(
      () =>
        new DriverProfile({
          id: 'profile-id',
          userId: 'user-id',
          status: DriverStatus.PENDING_ONBOARDING,
          vehicle,
          createdAt: now,
          updatedAt: now,
        }),
    ).toThrow('A vehicle must belong to its driver profile');
  });
});
