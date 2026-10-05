import { PublishDriverLocationUseCase } from './application/use-cases/publish-driver-location.use-case';
import { PublishRideStatusUseCase } from './application/use-cases/publish-ride-status.use-case';
import { RidesGateway } from './presentation/gateways/rides.gateway';
import { SocketIoRidePublisher } from './infrastructure/realtime/socket-io-ride-publisher';
import { RideRealtimePublisher } from './application/contracts/ride-realtime-publisher';
import { ListAvailableRidesUseCase } from './application/use-cases/list-available-rides.use-case';
import { AuthorizeRideRoomUseCase } from './application/use-cases/authorize-ride-room.use-case';
import { ListRideHistoryUseCase } from './application/use-cases/list-ride-history.use-case';
import { GetActiveRideUseCase } from './application/use-cases/get-active-ride.use-case';
import { RideEventRepository } from './domain/repositories/ride-event.repository';
import { PrismaRideEventRepository } from './infrastructure/persistence/prisma-ride-event.repository';
import { ChangeRideStatusUseCase } from './application/use-cases/change-ride-status.use-case';
import { AcceptRideUseCase } from './application/use-cases/accept-ride.use-case';
import { RideAcceptance } from './application/contracts/ride-acceptance';
import { PrismaRideAcceptance } from './infrastructure/persistence/prisma-ride-acceptance';
import { DriversModule } from '../drivers/drivers.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { IdentityModule } from '../identity/identity.module';
import { CreateRideUseCase } from './application/use-cases/create-ride.use-case';
import { GetRideUseCase } from './application/use-cases/get-ride.use-case';
import { GetRideDetailsUseCase } from './application/use-cases/get-ride-details.use-case';
import { RideRepository } from './domain/repositories/ride.repository';
import { PrismaRideRepository } from './infrastructure/persistence/prisma-ride.repository';
import { RidesController } from './presentation/controllers/rides.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { CacheModule } from '@/infrastructure/cache/cache.module';
import { RideCache } from './application/contracts/ride-cache';
import { RedisRideCache } from './infrastructure/cache/redis-ride-cache';

@Module({
  imports: [
    DatabaseModule,
    IdentityModule,
    DriversModule,
    NotificationsModule,
    CacheModule,
  ],
  controllers: [RidesController],
  providers: [
    PublishDriverLocationUseCase,
    PublishRideStatusUseCase,
    RidesGateway,
    SocketIoRidePublisher,
    ListAvailableRidesUseCase,
    AuthorizeRideRoomUseCase,
    ListRideHistoryUseCase,
    GetActiveRideUseCase,
    ChangeRideStatusUseCase,
    AcceptRideUseCase,
    CreateRideUseCase,
    GetRideUseCase,
    GetRideDetailsUseCase,
    { provide: RideRealtimePublisher, useExisting: SocketIoRidePublisher },
    { provide: RideEventRepository, useClass: PrismaRideEventRepository },
    { provide: RideAcceptance, useClass: PrismaRideAcceptance },
    { provide: RideRepository, useClass: PrismaRideRepository },
    { provide: RideCache, useClass: RedisRideCache },
  ],
  exports: [AcceptRideUseCase, CreateRideUseCase, GetRideUseCase],
})
export class RidesModule {}
