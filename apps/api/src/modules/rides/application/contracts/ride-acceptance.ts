import { RideEvent } from '../../domain/entities/ride-event.entity';
import { Ride } from '../../domain/entities/ride.entity';

export type RideAcceptanceResult =
  | { outcome: 'accepted'; ride: Ride }
  | { outcome: 'conflict' }
  | { outcome: 'ineligible' };

export abstract class RideAcceptance {
  abstract accept(
    rideId: string,
    driverId: string,
    event: RideEvent,
  ): Promise<RideAcceptanceResult>;
}
