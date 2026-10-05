import { ListRideHistoryUseCase } from './application/use-cases/list-ride-history.use-case';
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

@Module({
  imports: [DatabaseModule, IdentityModule, DriversModule],
  controllers: [RidesController],
  providers: [
    ListRideHistoryUseCase,
    ChangeRideStatusUseCase,
    AcceptRideUseCase,
    CreateRideUseCase,
    GetRideUseCase,
    GetRideDetailsUseCase,
    { provide: RideEventRepository, useClass: PrismaRideEventRepository },

    { provide: RideAcceptance, useClass: PrismaRideAcceptance },

    { provide: RideRepository, useClass: PrismaRideRepository },
  ],
  exports: [AcceptRideUseCase, CreateRideUseCase, GetRideUseCase],
})
export class RidesModule {}
