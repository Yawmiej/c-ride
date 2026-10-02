import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { GetDriverProfileUseCase } from './application/use-cases/get-driver-profile.use-case';
import { DriverProfileRepository } from './domain/repositories/driver-profile.repository';
import { PrismaDriverProfileRepository } from './infrastructure/persistence/prisma-driver-profile.repository';
import { PrismaDriverCreation } from './infrastructure/persistence/prisma-driver-creation';

@Module({
  imports: [DatabaseModule],
  providers: [
    PrismaDriverCreation,
    GetDriverProfileUseCase,
    {
      provide: DriverProfileRepository,
      useClass: PrismaDriverProfileRepository,
    },
  ],
  exports: [PrismaDriverCreation, GetDriverProfileUseCase],
})
export class DriversModule {}
