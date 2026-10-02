import { DriverStatus } from '../enums/driver-status.enum';
import { Vehicle, VehicleProps } from './vehicle.entity';

export interface DriverProfileProps {
  id: string;
  userId: string;
  status: DriverStatus;
  isAvailable: boolean;
  vehicle: Vehicle | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverProfileData extends Omit<DriverProfileProps, 'vehicle'> {
  vehicle: VehicleProps | null;
}

export class DriverProfile {
  constructor(private readonly props: DriverProfileProps) {}

  static empty(id: string, userId: string): DriverProfile {
    const now = new Date();
    return new DriverProfile({
      id,
      userId,
      status: DriverStatus.PENDING_ONBOARDING,
      isAvailable: false,
      vehicle: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  get id() {
    return this.props.id;
  }
  get userId() {
    return this.props.userId;
  }
  get status() {
    return this.props.status;
  }
  get isAvailable() {
    return this.props.isAvailable;
  }
  get vehicle() {
    return this.props.vehicle;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  toSafeObject(): DriverProfileData {
    return {
      id: this.id,
      userId: this.userId,
      status: this.status,
      isAvailable: this.isAvailable,
      vehicle: this.vehicle?.toSafeObject() ?? null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
