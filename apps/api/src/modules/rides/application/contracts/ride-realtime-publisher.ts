import { RideStatus } from '../../domain/enums/ride-status.enum';

export interface RideStatusChanged {
  rideId: string;
  status: RideStatus;
  timestamp: string;
}

export abstract class RideRealtimePublisher {
  abstract publishStatusChanged(event: RideStatusChanged): void;
}
