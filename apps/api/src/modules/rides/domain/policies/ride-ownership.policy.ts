import { Ride } from '../entities/ride.entity';

export class RideOwnershipPolicy {
  static isRider(ride: Ride, userId: string): boolean {
    return ride.riderId === userId;
  }

  static isAssignedDriver(ride: Ride, userId: string): boolean {
    return ride.driverId === userId;
  }

  static isParticipant(ride: Ride, userId: string): boolean {
    return this.isRider(ride, userId) || this.isAssignedDriver(ride, userId);
  }
}
