import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { IdentityModule } from '../identity/identity.module';
import { CreateRideUseCase } from './application/use-cases/create-ride.use-case';
import { GetRideUseCase } from './application/use-cases/get-ride.use-case';
import { RideRepository } from './domain/repositories/ride.repository';
import { PrismaRideRepository } from './infrastructure/persistence/prisma-ride.repository';
import { RidesController } from './presentation/controllers/rides.controller';

@Module({
  imports: [DatabaseModule, IdentityModule],
  controllers: [RidesController],
  providers: [
    CreateRideUseCase,
    GetRideUseCase,
    { provide: RideRepository, useClass: PrismaRideRepository },
  ],
  exports: [CreateRideUseCase, GetRideUseCase],
})
export class RidesModule {}
