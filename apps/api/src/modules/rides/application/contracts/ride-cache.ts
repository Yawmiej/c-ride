import { Ride } from '../../domain/entities/ride.entity';

export abstract class RideCache {
  abstract get(rideId: string): Promise<Ride | null>;
  abstract set(ride: Ride): Promise<void>;
  abstract invalidate(rideId: string): Promise<void>;
}
