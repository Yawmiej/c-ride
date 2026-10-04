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

  toSafeObject(): RideEventProps {
    return { ...this.props };
  }
}
