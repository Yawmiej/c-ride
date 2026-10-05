import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { FirebaseModule } from '@/infrastructure/firebase/firebase.module';
import { PushNotificationSender } from './application/contracts/push-notification-sender';
import { RideNotificationPublisher } from './application/contracts/ride-notification-publisher';
import { RegisterDeviceUseCase } from './application/use-cases/register-device.use-case';
import { SendNotificationUseCase } from './application/use-cases/send-notification.use-case';
import { SendRideNotificationUseCase } from './application/use-cases/send-ride-notification.use-case';
import { UserDeviceRepository } from './domain/repositories/user-device.repository';
import { FirebasePushNotificationSender } from './infrastructure/firebase/firebase-push-notification.sender';
import { PrismaUserDeviceRepository } from './infrastructure/persistence/prisma-user-device.repository';
import { DevicesController } from './presentation/controllers/devices.controller';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  controllers: [DevicesController],
  providers: [
    RegisterDeviceUseCase,
    SendNotificationUseCase,
    SendRideNotificationUseCase,
    { provide: UserDeviceRepository, useClass: PrismaUserDeviceRepository },
    {
      provide: PushNotificationSender,
      useClass: FirebasePushNotificationSender,
    },
    {
      provide: RideNotificationPublisher,
      useExisting: SendRideNotificationUseCase,
    },
  ],
  exports: [RideNotificationPublisher],
})
export class NotificationsModule {}
