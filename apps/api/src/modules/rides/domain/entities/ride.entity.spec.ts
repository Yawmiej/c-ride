import { Ride } from './ride.entity';
import { RideStatus } from '../enums/ride-status.enum';
import { RideOwnershipPolicy } from '../policies/ride-ownership.policy';

describe('Ride ownership policy', () => {
  const ride = new Ride({
    id: 'ride-id',
    riderId: 'rider-id',
    driverId: 'driver-id',
    status: RideStatus.REQUESTED,
    pickupLat: 6.5244,
    pickupLng: 3.3792,
    dropoffLat: 6.6018,
    dropoffLng: 3.3515,
    fare: '1500.00',
    createdAt: new Date('2026-10-02T12:00:00.000Z'),
    updatedAt: new Date('2026-10-02T12:00:00.000Z'),
  });

  it('recognizes only the rider and assigned driver as participants', () => {
    expect(RideOwnershipPolicy.isRider(ride, 'rider-id')).toBe(true);
    expect(RideOwnershipPolicy.isAssignedDriver(ride, 'driver-id')).toBe(true);
    expect(RideOwnershipPolicy.isParticipant(ride, 'rider-id')).toBe(true);
    expect(RideOwnershipPolicy.isParticipant(ride, 'driver-id')).toBe(true);
    expect(RideOwnershipPolicy.isParticipant(ride, 'other-user-id')).toBe(
      false,
    );
  });

  it('does not treat an unassigned ride as owned by a driver', () => {
    const unassigned = new Ride({ ...ride.toSafeObject(), driverId: null });

    expect(RideOwnershipPolicy.isAssignedDriver(unassigned, 'driver-id')).toBe(
      false,
    );
    expect(RideOwnershipPolicy.isParticipant(unassigned, 'driver-id')).toBe(
      false,
    );
  });
});
