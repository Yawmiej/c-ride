export interface PushNotification {
  title: string;
  body: string;
  data: Record<string, string>;
}

export abstract class PushNotificationSender {
  abstract send(
    tokens: string[],
    notification: PushNotification,
  ): Promise<void>;
}
