import { Injectable } from '@nestjs/common';
import {
  PushNotification,
  PushNotificationSender,
} from '../contracts/push-notification-sender';
import { UserDeviceRepository } from '../../domain/repositories/user-device.repository';

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private readonly devices: UserDeviceRepository,
    private readonly sender: PushNotificationSender,
  ) {}

  async execute(userId: string, notification: PushNotification): Promise<void> {
    const devices = await this.devices.findByUserId(userId);
    if (devices.length === 0) return;
    await this.sender.send(
      devices.map((device) => device.token),
      notification,
    );
  }
}
