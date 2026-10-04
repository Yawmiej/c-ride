import { RideStatus } from '../enums/ride-status.enum';
import {
  RideActor,
  RideTransitionPolicy,
} from '../policies/ride-transition.policy';
import { FarePolicy } from '../policies/fare.policy';

export interface RequestedRideProps {
  id: string;
  riderId: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
}

export interface RideProps {
  id: string;
  riderId: string;
  driverId: string | null;
  status: RideStatus;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  fare: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RideData = Readonly<RideProps>;

export class Ride {
  constructor(private readonly props: RideProps) {}

  static requested(input: RequestedRideProps): Ride {
    this.assertCoordinates(input);
    const now = new Date();
    return new Ride({
      ...input,
      driverId: null,
      status: RideStatus.REQUESTED,
      fare: FarePolicy.calculate().amount,
      createdAt: now,
      updatedAt: now,
    });
  }

  transitionTo(status: RideStatus, actor: RideActor): Ride {
    RideTransitionPolicy.assertAllowed(this, status, actor);
    return new Ride({
      ...this.props,
      status,
      driverId: status === RideStatus.ACCEPTED ? actor.id : this.driverId,
      updatedAt: new Date(),
    });
  }

  private static assertCoordinates(input: RequestedRideProps): void {
    this.assertLatitude('pickupLat', input.pickupLat);
    this.assertLongitude('pickupLng', input.pickupLng);
    this.assertLatitude('dropoffLat', input.dropoffLat);
    this.assertLongitude('dropoffLng', input.dropoffLng);
  }

  private static assertLatitude(name: string, value: number): void {
    if (!Number.isFinite(value) || value < -90 || value > 90) {
      throw new RangeError(`${name} must be a finite latitude in [-90, 90]`);
    }
  }

  private static assertLongitude(name: string, value: number): void {
    if (!Number.isFinite(value) || value < -180 || value > 180) {
      throw new RangeError(`${name} must be a finite longitude in [-180, 180]`);
    }
  }

  get id() {
    return this.props.id;
  }

  get riderId() {
    return this.props.riderId;
  }

  get driverId() {
    return this.props.driverId;
  }

  get status() {
    return this.props.status;
  }

  get pickupLat() {
    return this.props.pickupLat;
  }

  get pickupLng() {
    return this.props.pickupLng;
  }

  get dropoffLat() {
    return this.props.dropoffLat;
  }

  get dropoffLng() {
    return this.props.dropoffLng;
  }

  get fare() {
    return this.props.fare;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  toSafeObject(): RideData {
    return { ...this.props };
  }
}
