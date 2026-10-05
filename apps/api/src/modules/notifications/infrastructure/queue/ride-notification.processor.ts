import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { RideNotificationEvent } from '../../application/contracts/ride-notification-publisher';
import { SendRideNotificationUseCase } from '../../application/use-cases/send-ride-notification.use-case';
import { RIDE_NOTIFICATION_QUEUE } from './ride-notification.queue';

@Processor(RIDE_NOTIFICATION_QUEUE)
export class RideNotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(RideNotificationProcessor.name);

  constructor(private readonly sendNotification: SendRideNotificationUseCase) {
    super();
  }

  async process(job: Job<RideNotificationEvent>): Promise<void> {
    await this.sendNotification.execute(job.data);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<RideNotificationEvent> | undefined): void {
    if (!job) return;
    const exhausted = job.attemptsMade >= (job.opts.attempts ?? 1);
    this.logger.warn(
      `Notification job ${job.id} for ride ${job.data.rideId} failed on attempt ${job.attemptsMade}; ${exhausted ? 'retries exhausted' : 'retry scheduled'}`,
    );
  }

  @OnWorkerEvent('error')
  onError(): void {
    this.logger.error('Ride notification worker connection failed');
  }
}
