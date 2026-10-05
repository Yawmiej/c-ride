import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';
import { CacheModule } from './infrastructure/cache/cache.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { FirebaseModule } from './infrastructure/firebase/firebase.module';
import { QueueModule } from './infrastructure/queue/queue.module';
import { TelemetryModule } from './infrastructure/telemetry/telemetry.module';
import { HealthModule } from './infrastructure/health/health.module';
import { IdentityModule } from './modules/identity/identity.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { RidesModule } from './modules/rides/rides.module';

@Module({
  imports: [
    ConfigurationModule,
    TelemetryModule,
    HealthModule,
    DatabaseModule,
    CacheModule,
    QueueModule,
    FirebaseModule,
    IdentityModule,
    DriversModule,
    RidesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
