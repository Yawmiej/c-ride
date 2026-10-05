import { Injectable, Logger } from '@nestjs/common';
import { getMessaging } from 'firebase-admin/messaging';
import { FirebaseService } from '@/infrastructure/firebase/firebase.service';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import {
  PushNotification,
  PushNotificationSender,
} from '../../application/contracts/push-notification-sender';

@Injectable()
export class FirebasePushNotificationSender extends PushNotificationSender {
  private readonly logger = new Logger(FirebasePushNotificationSender.name);

  constructor(private readonly firebase: FirebaseService) {
    super();
  }

  async send(fids: string[], notification: PushNotification): Promise<void> {
    const app = this.firebase.getApp();
    if (!app) throw new Error(ERROR_MESSAGES.PUSH_NOT_CONFIGURED);

    const result = await getMessaging(app).sendEachForMulticast({
      fids,
      notification: {
        title: notification.title,
        body: notification.body,
      },
      data: notification.data,
      webpush: {
        fcmOptions: { link: notification.data.link ?? '/' },
      },
    });
    if (result.failureCount > 0) {
      this.logger.warn(
        `FCM rejected ${result.failureCount} of ${fids.length} notification deliveries`,
      );
      throw new Error(ERROR_MESSAGES.PUSH_DELIVERY_FAILED);
    }
  }
}
