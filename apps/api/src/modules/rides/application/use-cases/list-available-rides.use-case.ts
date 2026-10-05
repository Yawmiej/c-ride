import { Injectable } from '@nestjs/common';
import { DriverEligibility } from '../../../drivers/application/contracts/driver-eligibility';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { RideRepository } from '../../domain/repositories/ride.repository';

@Injectable()
export class ListAvailableRidesUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly eligibility: DriverEligibility,
  ) {}

  async execute(actorId: string) {
    if (!(await this.eligibility.execute(actorId))) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.RIDE_DISCOVERY_FORBIDDEN,
      );
    }
    return this.rides.listAvailable();
  }
}
