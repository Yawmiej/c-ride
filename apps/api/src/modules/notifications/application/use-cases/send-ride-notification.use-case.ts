import { Injectable, Logger } from '@nestjs/common';
import {
  RideNotificationEvent,
  RideNotificationPublisher,
} from '../contracts/ride-notification-publisher';
import { SendNotificationUseCase } from './send-notification.use-case';

const COPY = {
  ACCEPTED: {
    title: 'Ride accepted',
    body: 'A driver has accepted your ride.',
  },
  IN_PROGRESS: {
    title: 'Ride started',
    body: 'Your ride is now in progress.',
  },
  COMPLETED: {
    title: 'Ride completed',
    body: 'You have arrived at your destination.',
  },
} as const;

@Injectable()
export class SendRideNotificationUseCase extends RideNotificationPublisher {
  private readonly logger = new Logger(SendRideNotificationUseCase.name);

  constructor(private readonly sendNotification: SendNotificationUseCase) {
    super();
  }

  async publish(event: RideNotificationEvent): Promise<void> {
    try {
      await this.sendNotification.execute(event.riderId, {
        ...COPY[event.status],
        data: {
          rideId: event.rideId,
          type: `RIDE_${event.status}`,
          link: `/rider/rides/${event.rideId}`,
        },
      });
    } catch {
      // The ride is already committed. Push delivery is best effort.
      this.logger.warn(
        `Ride ${event.rideId} committed, but its push notification failed`,
      );
    }
  }
}
