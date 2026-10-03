import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { DriverProfileData } from '../../domain/entities/driver-profile.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';
import { DriverOnboarding } from '../contracts/driver-onboarding';

export interface OnboardDriverCommand {
  userId: string;
  type: VehicleType;
  make: string;
  model: string;
  color: string;
  year: number | null;
  licensePlate: string;
}

/**
 * Application entry point for driver onboarding. Additional onboarding
 * requirements, such as KYC, can extend this command and persistence contract.
 */
@Injectable()
export class OnboardDriverUseCase {
  constructor(
    private readonly profiles: DriverProfileRepository,
    private readonly vehicles: VehicleRepository,
    private readonly onboarding: DriverOnboarding,
  ) {}

  async execute(command: OnboardDriverCommand): Promise<DriverProfileData> {
    const profile = await this.profiles.findByUserId(command.userId);
    if (!profile) {
      throw new ApplicationError(
        ERROR_KINDS.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND('Driver profile'),
      );
    }

    if (await this.vehicles.findByLicensePlate(command.licensePlate)) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.LICENSE_PLATE_IN_USE,
      );
    }

    const now = new Date();
    const vehicle = Vehicle.register({
      id: randomUUID(),
      driverProfileId: profile.id,
      type: command.type,
      make: command.make,
      model: command.model,
      color: command.color,
      year: command.year,
      licensePlate: command.licensePlate,
      createdAt: now,
      updatedAt: now,
    });
    const activatedProfile = profile.activateWith(vehicle);
    const saved = await this.onboarding.onboard({
      profile: activatedProfile,
      vehicle,
    });
    return saved.toSafeObject();
  }
}
