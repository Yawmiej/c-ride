import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { GetDriverProfileUseCase } from './application/use-cases/get-driver-profile.use-case';
import { GetCurrentDriverUseCase } from './application/use-cases/get-current-driver.use-case';
import { OnboardDriverVehicleUseCase } from './application/use-cases/onboard-driver-vehicle.use-case';
import { DriverProfileRepository } from './domain/repositories/driver-profile.repository';
import { VehicleRepository } from './domain/repositories/vehicle.repository';
import { PrismaDriverProfileRepository } from './infrastructure/persistence/prisma-driver-profile.repository';
import { PrismaDriverCreation } from './infrastructure/persistence/prisma-driver-creation';
import { PrismaVehicleRepository } from './infrastructure/persistence/prisma-vehicle.repository';
import { DriversController } from './presentation/controllers/drivers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DriversController],
  providers: [
    PrismaDriverCreation,
    GetDriverProfileUseCase,
    GetCurrentDriverUseCase,
    OnboardDriverVehicleUseCase,
    {
      provide: DriverProfileRepository,
      useClass: PrismaDriverProfileRepository,
    },
    {
      provide: VehicleRepository,
      useClass: PrismaVehicleRepository,
    },
  ],
  exports: [
    PrismaDriverCreation,
    GetDriverProfileUseCase,
    GetCurrentDriverUseCase,
    OnboardDriverVehicleUseCase,
  ],
})
export class DriversModule {}
