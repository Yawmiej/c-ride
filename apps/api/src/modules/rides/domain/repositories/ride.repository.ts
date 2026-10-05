import { RideActor } from '../policies/ride-transition.policy';
import { RideEvent } from '../entities/ride-event.entity';
import { RideStatus } from '../enums/ride-status.enum';
import { Ride } from '../entities/ride.entity';

export interface RideMutationResult {
  ride: Ride;
  event: RideEvent;
}

export interface RideHistoryQuery {
  actor: RideActor;
  page: number;
  limit: number;
}

export interface RideHistoryResult {
  items: Ride[];
  total: number;
}

export abstract class RideRepository {
  /** Persist the requested ride and its event atomically. */
  abstract create(ride: Ride, event: RideEvent): Promise<RideMutationResult>;

  /** Returns null when the ride no longer matches the expected state/participants. */
  abstract updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
    event: RideEvent,
  ): Promise<RideMutationResult | null>;
  abstract listHistory(query: RideHistoryQuery): Promise<RideHistoryResult>;

  abstract findById(id: string): Promise<Ride | null>;
}
