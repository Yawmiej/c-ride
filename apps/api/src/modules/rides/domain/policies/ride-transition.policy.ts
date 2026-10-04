import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import type { Ride } from '../entities/ride.entity';
import { RideStatus } from '../enums/ride-status.enum';

export interface RideActor {
  id: string;
  role: 'RIDER' | 'DRIVER';
}

export class RideTransitionPolicy {
  static assertAllowed(
    ride: Ride,
    nextStatus: RideStatus,
    actor: RideActor,
  ): void {
    const allowed =
      (ride.status === RideStatus.REQUESTED &&
        (nextStatus === RideStatus.ACCEPTED ||
          nextStatus === RideStatus.CANCELLED)) ||
      (ride.status === RideStatus.ACCEPTED &&
        (nextStatus === RideStatus.IN_PROGRESS ||
          nextStatus === RideStatus.CANCELLED)) ||
      (ride.status === RideStatus.IN_PROGRESS &&
        nextStatus === RideStatus.COMPLETED);

    if (!allowed) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.RIDE_TRANSITION_INVALID,
      );
    }

    const isRider = actor.role === 'RIDER' && actor.id === ride.riderId;
    const isDriver = actor.role === 'DRIVER' && actor.id === ride.driverId;
    let permitted: boolean;

    if (nextStatus === RideStatus.ACCEPTED) {
      permitted =
        actor.role === 'DRIVER' &&
        actor.id !== ride.riderId &&
        ride.driverId === null;
    } else if (nextStatus === RideStatus.CANCELLED) {
      permitted = isRider || (ride.status === RideStatus.ACCEPTED && isDriver);
    } else {
      permitted = isDriver;
    }

    if (!permitted) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.RIDE_TRANSITION_FORBIDDEN,
      );
    }
  }
}
