import { RideStatus } from '../../domain/enums/ride-status.enum';

export interface RideStatusChanged {
  rideId: string;
  status: RideStatus;
  timestamp: string;
}

export interface RideLocationUpdated {
  rideId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export abstract class RideRealtimePublisher {
  abstract publishLocationUpdated(
    event: RideLocationUpdated,
  ): void | Promise<void>;
  abstract publishStatusChanged(event: RideStatusChanged): void | Promise<void>;
}
