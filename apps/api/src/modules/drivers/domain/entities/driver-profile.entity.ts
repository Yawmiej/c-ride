import { DriverStatus } from '../enums/driver-status.enum';
import { DriverOnboardingConflictError } from '../errors/driver-onboarding-conflict.error';
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
  constructor(private readonly props: DriverProfileProps) {
    if (props.vehicle && props.vehicle.driverProfileId !== props.id) {
      throw new Error('A vehicle must belong to its driver profile');
    }
  }

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

  hasVehicle(): boolean {
    return this.vehicle !== null;
  }

  activateWith(vehicle: Vehicle): DriverProfile {
    if (this.status !== DriverStatus.PENDING_ONBOARDING) {
      throw new DriverOnboardingConflictError(
        'Only pending drivers can complete onboarding',
      );
    }
    if (this.hasVehicle()) {
      throw new DriverOnboardingConflictError(
        'A driver profile can have only one vehicle',
      );
    }
    if (vehicle.driverProfileId !== this.id) {
      throw new DriverOnboardingConflictError(
        'A vehicle must belong to its driver profile',
      );
    }

    return new DriverProfile({
      ...this.props,
      status: DriverStatus.ACTIVE,
      isAvailable: false,
      vehicle,
      updatedAt: new Date(),
    });
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
