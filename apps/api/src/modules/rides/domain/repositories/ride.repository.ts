import { RideEvent } from '../entities/ride-event.entity';
import { RideStatus } from '../enums/ride-status.enum';
import { Ride } from '../entities/ride.entity';

export abstract class RideRepository {
  /** Persist the requested ride and its event atomically. */
  abstract create(ride: Ride, event: RideEvent): Promise<Ride>;

  /** Returns null when the ride no longer matches the expected state/participants. */
  abstract updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
  ): Promise<Ride | null>;
  abstract findById(id: string): Promise<Ride | null>;
}
