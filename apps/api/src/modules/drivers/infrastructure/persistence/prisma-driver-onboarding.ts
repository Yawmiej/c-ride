import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import {
  DriverOnboarding,
  DriverOnboardingInput,
} from '../../application/contracts/driver-onboarding';
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
          },
        });
        if (updated.count !== 1) {
          throw new ApplicationError(
            ERROR_KINDS.CONFLICT,
            ERROR_MESSAGES.DRIVER_ONBOARDING_UNAVAILABLE,
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
        throw new ApplicationError(
          ERROR_KINDS.CONFLICT,
          ERROR_MESSAGES.LICENSE_PLATE_IN_USE,
        );
      }
      throw error;
    }
  }
}
