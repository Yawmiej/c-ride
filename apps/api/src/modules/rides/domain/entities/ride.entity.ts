import { RideStatus } from '../enums/ride-status.enum';

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
