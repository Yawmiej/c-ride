import { Injectable } from '@nestjs/common';
import { RideNotificationEvent } from '../contracts/ride-notification-publisher';
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
export class SendRideNotificationUseCase {
  constructor(private readonly sendNotification: SendNotificationUseCase) {}

  async execute(event: RideNotificationEvent): Promise<void> {
    await this.sendNotification.execute(event.riderId, {
      ...COPY[event.status],
      data: {
        rideId: event.rideId,
        type: `RIDE_${event.status}`,
        link: `/rider/rides/${event.rideId}`,
      },
    });
  }
}
