import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { Ride } from '../entities/ride.entity';
import { RideStatus } from '../enums/ride-status.enum';
import { RideActor } from './ride-transition.policy';
import { RideOwnershipPolicy } from './ride-ownership.policy';

export class DriverLocationPolicy {
  static assertAllowed(ride: Ride, actor: RideActor): void {
    if (
      actor.role !== 'DRIVER' ||
      !RideOwnershipPolicy.isAssignedDriver(ride, actor.id)
    ) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.DRIVER_LOCATION_FORBIDDEN,
      );
    }
    if (
      ride.status !== RideStatus.ACCEPTED &&
      ride.status !== RideStatus.IN_PROGRESS
    ) {
      throw new ApplicationError(
        ERROR_KINDS.CONFLICT,
        ERROR_MESSAGES.DRIVER_LOCATION_INACTIVE_RIDE,
      );
    }
  }

  static assertCoordinates(latitude: number, longitude: number): void {
    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new RangeError(ERROR_MESSAGES.INVALID_DRIVER_LOCATION);
    }
  }
}
