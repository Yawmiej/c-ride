import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import {
  DriverOnboarding,
  DriverOnboardingInput,
} from '../../application/contracts/driver-onboarding';
import { DriverOnboardingConflictError } from '../../domain/errors/driver-onboarding-conflict.error';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { DriverProfileMapper } from './driver-profile.mapper';
import { VehicleMapper } from './vehicle.mapper';

@Injectable()
export class PrismaDriverOnboarding implements DriverOnboarding {
  constructor(private readonly prisma: PrismaService) {}

  async onboard(input: DriverOnboardingInput): Promise<DriverProfile> {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const updated = await transaction.driverProfile.updateMany({
          where: {
            id: input.profile.id,
            status: 'PENDING_ONBOARDING',
            vehicle: { is: null },
          },
          data: {
            status: 'ACTIVE',
            isAvailable: false,
          },
        });
        if (updated.count !== 1) {
          throw new DriverOnboardingConflictError(
            'Driver onboarding is no longer available',
          );
        }

        await transaction.vehicle.create({
          data: VehicleMapper.toPersistence(input.vehicle),
        });
        const saved = await transaction.driverProfile.findUniqueOrThrow({
          where: { id: input.profile.id },
          include: { vehicle: true },
        });
        return DriverProfileMapper.toDomain(saved);
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new DriverOnboardingConflictError(
          'License plate is already in use',
        );
      }
      throw error;
    }
  }
}
