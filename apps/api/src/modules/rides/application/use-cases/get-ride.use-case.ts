import { Injectable } from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { Ride } from '../../domain/entities/ride.entity';
import { RideOwnershipPolicy } from '../../domain/policies/ride-ownership.policy';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { RideCache } from '../contracts/ride-cache';

export interface GetRideCommand {
  rideId: string;
  actorId: string;
}

@Injectable()
export class GetRideUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly cache: RideCache,
  ) {}

  async execute(command: GetRideCommand): Promise<Ride> {
    const cached = await this.cache.get(command.rideId);
    const ride = cached ?? (await this.rides.findById(command.rideId));
    if (!ride) {
      throw new ApplicationError(
        ERROR_KINDS.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND('Ride'),
      );
    }
    if (!RideOwnershipPolicy.isParticipant(ride, command.actorId)) {
      throw new ApplicationError(
        ERROR_KINDS.FORBIDDEN,
        ERROR_MESSAGES.RIDE_ACCESS_FORBIDDEN,
      );
    }
    if (!cached) await this.cache.set(ride);
    return ride;
  }
}
