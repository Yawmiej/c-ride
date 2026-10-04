import { Ride } from '../../domain/entities/ride.entity';

export type RideAcceptanceResult =
  | { outcome: 'accepted'; ride: Ride }
  | { outcome: 'conflict' }
  | { outcome: 'ineligible' };

export abstract class RideAcceptance {
  abstract accept(
    rideId: string,
    driverId: string,
  ): Promise<RideAcceptanceResult>;
}
