import { DriverEligibility } from './application/contracts/driver-eligibility';
import { CheckDriverEligibilityUseCase } from './application/use-cases/check-driver-eligibility.use-case';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { GetDriverProfileUseCase } from './application/use-cases/get-driver-profile.use-case';
import { OnboardDriverUseCase } from './application/use-cases/onboard-driver.use-case';
import { DriverOnboarding } from './application/contracts/driver-onboarding';
import { DriverProfileRepository } from './domain/repositories/driver-profile.repository';
import { VehicleRepository } from './domain/repositories/vehicle.repository';
import { PrismaDriverProfileRepository } from './infrastructure/persistence/prisma-driver-profile.repository';
import { PrismaDriverCreation } from './infrastructure/persistence/prisma-driver-creation';
import { PrismaVehicleRepository } from './infrastructure/persistence/prisma-vehicle.repository';
import { PrismaDriverOnboarding } from './infrastructure/persistence/prisma-driver-onboarding';
import { DriversController } from './presentation/controllers/drivers.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [DriversController],
  providers: [
    { provide: DriverEligibility, useClass: CheckDriverEligibilityUseCase },
    PrismaDriverCreation,
    GetDriverProfileUseCase,
    OnboardDriverUseCase,
    {
      provide: DriverOnboarding,
      useClass: PrismaDriverOnboarding,
    },
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
    DriverEligibility,
    PrismaDriverCreation,
    GetDriverProfileUseCase,
    OnboardDriverUseCase,
  ],
})
export class DriversModule {}
