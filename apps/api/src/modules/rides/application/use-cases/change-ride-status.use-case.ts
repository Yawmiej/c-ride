import { PublishRideStatusUseCase } from './publish-ride-status.use-case';
import { randomUUID } from 'node:crypto';
import { RideEvent } from '../../domain/entities/ride-event.entity';
import { Injectable } from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { RideActor } from '../../domain/policies/ride-transition.policy';
import { RideOwnershipPolicy } from '../../domain/policies/ride-ownership.policy';
import { RideRepository } from '../../domain/repositories/ride.repository';

export interface ChangeRideStatusCommand {
  rideId: string;
  actor: RideActor;
  status: RideStatus;
}

@Injectable()
export class ChangeRideStatusUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly publishStatus: PublishRideStatusUseCase,
  ) {}

  async execute({
    rideId,
    actor,
    status,
  }: ChangeRideStatusCommand): Promise<Ride> {
    const ride = await this.rides.findById(rideId);
    if (!ride) {
      throw new ApplicationError(
        ERROR_KINDS.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND('Ride'),
      );
    }
    if (!RideOwnershipPolicy.isParticipant(ride, actor.id)) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.RIDE_ACCESS_FORBIDDEN,
      );
    }
    // Acceptance must always go through its dedicated eligibility/assignment workflow.
    if (status === RideStatus.ACCEPTED || status === RideStatus.REQUESTED) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.RIDE_TRANSITION_INVALID,
      );
    }

    const changed = ride.transitionTo(status, actor);
    const event = RideEvent.statusChanged(randomUUID(), ride, changed, actor);
    const saved = await this.rides.updateStatus(changed, ride.status, event);
    if (!saved) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.RIDE_STATUS_CHANGED,
      );
    }
    await this.publishStatus.execute(saved);
    return saved.ride;
  }
}
