import { Injectable, Logger } from '@nestjs/common';
import { RideMutationResult } from '../../domain/repositories/ride.repository';
import { RideRealtimePublisher } from '../contracts/ride-realtime-publisher';
import { RideNotificationPublisher } from '../../../notifications/application/contracts/ride-notification-publisher';

@Injectable()
export class PublishRideStatusUseCase {
  private readonly logger = new Logger(PublishRideStatusUseCase.name);

  constructor(
    private readonly publisher: RideRealtimePublisher,
    private readonly notifications: RideNotificationPublisher,
  ) {}

  async execute({ ride, event }: RideMutationResult): Promise<void> {
    try {
      await this.publisher.publishStatusChanged({
        rideId: ride.id,
        status: ride.status,
        timestamp: event.toSafeObject().createdAt.toISOString(),
      });
    } catch {
      // Persistence already committed. Realtime delivery is best effort.
      this.logger.warn(
        `Ride ${ride.id} committed, but its status broadcast failed`,
      );
    }

    if (
      ride.status === 'ACCEPTED' ||
      ride.status === 'IN_PROGRESS' ||
      ride.status === 'COMPLETED'
    ) {
      await this.notifications.publish({
        rideId: ride.id,
        riderId: ride.riderId,
        status: ride.status,
      });
    }
  }
}
