import { PublishRideStatusUseCase } from './publish-ride-status.use-case';
import { randomUUID } from 'node:crypto';
import { RideEvent } from '../../domain/entities/ride-event.entity';
import { Injectable } from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { DriverEligibility } from '../../../drivers/application/contracts/driver-eligibility';
import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { RideTransitionPolicy } from '../../domain/policies/ride-transition.policy';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { RideAcceptance } from '../contracts/ride-acceptance';

export interface AcceptRideCommand {
  rideId: string;
  driverId: string;
}

@Injectable()
export class AcceptRideUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly eligibility: DriverEligibility,
    private readonly acceptance: RideAcceptance,
    private readonly publishStatus: PublishRideStatusUseCase,
  ) {}

  async execute({ rideId, driverId }: AcceptRideCommand): Promise<Ride> {
    if (!(await this.eligibility.execute(driverId))) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.DRIVER_INELIGIBLE,
      );
    }

    const ride = await this.rides.findById(rideId);
    if (!ride) {
      throw new ApplicationError(
        ERROR_KINDS.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND('Ride'),
      );
    }
    if (ride.status !== RideStatus.REQUESTED || ride.driverId !== null) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.RIDE_UNAVAILABLE,
      );
    }
    RideTransitionPolicy.assertAllowed(ride, RideStatus.ACCEPTED, {
      id: driverId,
      role: 'DRIVER',
    });

    const event = RideEvent.accepted(randomUUID(), ride, driverId);
    const result = await this.acceptance.accept(rideId, driverId, event);
    if (result.outcome === 'ineligible') {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.DRIVER_INELIGIBLE,
      );
    }
    if (result.outcome === 'conflict') {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.RIDE_UNAVAILABLE,
      );
    }
    await this.publishStatus.execute(result);
    return result.ride;
  }
}
