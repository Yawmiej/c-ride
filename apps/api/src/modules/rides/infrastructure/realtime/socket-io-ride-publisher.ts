import { Injectable } from '@nestjs/common';
import { Namespace } from 'socket.io';
import {
  RideRealtimePublisher,
  RideStatusChanged,
  RideLocationUpdated,
} from '../../application/contracts/ride-realtime-publisher';
import {
  RIDE_SOCKET_EVENTS,
  rideRoom,
} from '../../presentation/gateways/ride-socket.events';

@Injectable()
export class SocketIoRidePublisher extends RideRealtimePublisher {
  private namespace?: Namespace;

  attach(namespace: Namespace): void {
    this.namespace = namespace;
  }

  publishLocationUpdated(event: RideLocationUpdated): void {
    if (!this.namespace)
      throw new Error('Ride socket transport is not initialized');
    this.namespace
      .to(rideRoom(event.rideId))
      .emit(RIDE_SOCKET_EVENTS.LOCATION_UPDATED, event);
  }

  publishStatusChanged(event: RideStatusChanged): void {
    if (!this.namespace)
      throw new Error('Ride socket transport is not initialized');
    this.namespace
      .to(rideRoom(event.rideId))
      .emit(RIDE_SOCKET_EVENTS.STATUS_CHANGED, event);
  }
}
