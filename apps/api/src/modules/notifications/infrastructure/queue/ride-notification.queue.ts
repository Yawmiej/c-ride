import { JobsOptions } from 'bullmq';

export const RIDE_NOTIFICATION_QUEUE = 'ride-notifications';
export const SEND_RIDE_NOTIFICATION_JOB = 'send-ride-notification';
export const RIDE_NOTIFICATION_JOB_OPTIONS: JobsOptions = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: 100,
  removeOnFail: 1000,
};
