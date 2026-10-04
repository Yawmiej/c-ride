import { RideEvent } from '../entities/ride-event.entity';

export abstract class RideEventRepository {
  abstract findByRideId(rideId: string): Promise<RideEvent[]>;
}
