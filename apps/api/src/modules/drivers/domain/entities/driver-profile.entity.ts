import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { DriverStatus } from '../enums/driver-status.enum';
import { Vehicle, VehicleProps } from './vehicle.entity';

export interface DriverProfileProps {
  id: string;
  userId: string;
  status: DriverStatus;
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
      throw new Error(ERROR_MESSAGES.VEHICLE_PROFILE_MISMATCH);
    }
  }

  static empty(id: string, userId: string): DriverProfile {
    const now = new Date();
    return new DriverProfile({
      id,
      userId,
      status: DriverStatus.PENDING_ONBOARDING,
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
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.DRIVER_ONBOARDING_REQUIRES_PENDING,
      );
    }
    if (this.hasVehicle()) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.DRIVER_ALREADY_HAS_VEHICLE,
      );
    }
    if (vehicle.driverProfileId !== this.id) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.VEHICLE_PROFILE_MISMATCH,
      );
    }

    return new DriverProfile({
      ...this.props,
      status: DriverStatus.ACTIVE,
      vehicle,
      updatedAt: new Date(),
    });
  }

  toSafeObject(): DriverProfileData {
    return {
      id: this.id,
      userId: this.userId,
      status: this.status,
      vehicle: this.vehicle?.toSafeObject() ?? null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
