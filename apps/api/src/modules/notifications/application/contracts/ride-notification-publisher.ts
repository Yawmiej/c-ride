export type RideNotificationStatus = 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface RideNotificationEvent {
  rideId: string;
  riderId: string;
  status: RideNotificationStatus;
}

export abstract class RideNotificationPublisher {
  abstract publish(event: RideNotificationEvent): Promise<void>;
}
