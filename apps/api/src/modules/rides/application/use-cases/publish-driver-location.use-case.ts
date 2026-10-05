import { Injectable } from '@nestjs/common';
import { AuthenticatedUser } from '../../../identity/application/types/authenticated-user';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { DriverLocationPolicy } from '../../domain/policies/driver-location.policy';
import { RideRealtimePublisher } from '../contracts/ride-realtime-publisher';

export interface PublishDriverLocationCommand {
  rideId: string;
  latitude: number;
  longitude: number;
}

@Injectable()
export class PublishDriverLocationUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly publisher: RideRealtimePublisher,
  ) {}

  async execute(
    actor: AuthenticatedUser,
    command: PublishDriverLocationCommand,
  ): Promise<void> {
    if (actor.role !== 'DRIVER') {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.DRIVER_LOCATION_FORBIDDEN,
      );
    }
    DriverLocationPolicy.assertCoordinates(command.latitude, command.longitude);
    const ride = await this.rides.findById(command.rideId);
    if (!ride) {
      throw new ApplicationError(
        ERROR_KINDS.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND('Ride'),
      );
    }
    DriverLocationPolicy.assertAllowed(ride, actor);
    await this.publisher.publishLocationUpdated({
      rideId: ride.id,
      latitude: command.latitude,
      longitude: command.longitude,
      timestamp: new Date().toISOString(),
    });
  }
}
