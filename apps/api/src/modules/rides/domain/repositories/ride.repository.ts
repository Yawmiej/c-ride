import { RideStatus } from '../enums/ride-status.enum';
import { Ride } from '../entities/ride.entity';

export abstract class RideRepository {
  /** Returns null when the ride no longer matches the expected state/participants. */
  abstract updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
  ): Promise<Ride | null>;
  abstract create(ride: Ride): Promise<Ride>;
  abstract findById(id: string): Promise<Ride | null>;
}
