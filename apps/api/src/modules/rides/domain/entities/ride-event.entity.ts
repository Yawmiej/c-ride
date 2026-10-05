import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { RideEventType } from '../enums/ride-event-type.enum';
import { RideStatus } from '../enums/ride-status.enum';
import { RideActor } from '../policies/ride-transition.policy';
import { Ride } from './ride.entity';

export interface RideEventPayload {
  actorRole: RideActor['role'];
  previousStatus: RideStatus | null;
  newStatus: RideStatus;
}

export interface RideEventProps {
  id: string;
  rideId: string;
  type: RideEventType;
  actorId: string;
  createdAt: Date;
  payload: RideEventPayload;
}

export class RideEvent {
  constructor(private readonly props: RideEventProps) {}

  static requested(id: string, ride: Ride): RideEvent {
    return new RideEvent({
      id,
      rideId: ride.id,
      type: RideEventType.REQUESTED,
      actorId: ride.riderId,
      createdAt: ride.createdAt,
      payload: {
        actorRole: 'RIDER',
        previousStatus: null,
        newStatus: RideStatus.REQUESTED,
      },
    });
  }

  static accepted(id: string, ride: Ride, driverId: string): RideEvent {
    return new RideEvent({
      id,
      rideId: ride.id,
      type: RideEventType.ACCEPTED,
      actorId: driverId,
      createdAt: new Date(),
      payload: {
        actorRole: 'DRIVER',
        previousStatus: ride.status,
        newStatus: RideStatus.ACCEPTED,
      },
    });
  }

  static statusChanged(
    id: string,
    previous: Ride,
    changed: Ride,
    actor: RideActor,
  ): RideEvent {
    let type: RideEventType;
    switch (changed.status) {
      case RideStatus.IN_PROGRESS:
        type = RideEventType.STARTED;
        break;
      case RideStatus.COMPLETED:
        type = RideEventType.COMPLETED;
        break;
      case RideStatus.CANCELLED:
        type = RideEventType.CANCELLED;
        break;
      default:
        throw new ApplicationError(
          ERROR_KINDS.CONFLICT,
          ERROR_MESSAGES.RIDE_TRANSITION_INVALID,
        );
    }
    return new RideEvent({
      id,
      rideId: changed.id,
      type,
      actorId: actor.id,
      createdAt: changed.updatedAt,
      payload: {
        actorRole: actor.role,
        previousStatus: previous.status,
        newStatus: changed.status,
      },
    });
  }

  toSafeObject(): RideEventProps {
    return { ...this.props };
  }
}
