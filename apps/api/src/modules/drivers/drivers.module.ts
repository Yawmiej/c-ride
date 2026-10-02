import { Module } from '@nestjs/common';
import { PrismaDriverRegistration } from './infrastructure/persistence/prisma-driver-registration';

@Module({
  providers: [PrismaDriverRegistration],
  exports: [PrismaDriverRegistration],
})
export class DriversModule {}
