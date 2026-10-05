import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import {
  RideNotificationEvent,
  RideNotificationPublisher,
} from '../../application/contracts/ride-notification-publisher';
import {
  RIDE_NOTIFICATION_QUEUE,
  SEND_RIDE_NOTIFICATION_JOB,
} from './ride-notification.queue';

@Injectable()
export class BullRideNotificationPublisher
  extends RideNotificationPublisher
  implements OnModuleInit
{
  private readonly logger = new Logger(BullRideNotificationPublisher.name);

  constructor(
    @InjectQueue(RIDE_NOTIFICATION_QUEUE)
    private readonly queue: Queue<RideNotificationEvent>,
  ) {
    super();
  }

  onModuleInit(): void {
    this.queue.on('error', () =>
      this.logger.error('Ride notification queue connection failed'),
    );
  }

  async publish(event: RideNotificationEvent): Promise<void> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      // Bound initial connection waiting; do not enqueue later after a timeout.
      await Promise.race([
        this.queue.waitUntilReady(),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () =>
              reject(new Error(ERROR_MESSAGES.NOTIFICATION_QUEUE_UNAVAILABLE)),
            1000,
          );
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
    await this.queue.add(SEND_RIDE_NOTIFICATION_JOB, event, {
      jobId: `${event.rideId}-${event.status}`,
    });
  }
}
