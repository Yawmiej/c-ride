import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { CacheModule } from './infrastructure/cache/cache.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { TelemetryModule } from './infrastructure/telemetry/telemetry.module';
import { IdentityModule } from './modules/identity/identity.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RidesModule } from './modules/rides/rides.module';

@Module({
  imports: [
    ConfigurationModule,
    TelemetryModule,
    DatabaseModule,
    CacheModule,
    QueueModule,
    FirebaseModule,
    IdentityModule,
    RidesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
