import { Injectable } from '@nestjs/common';
import { RideActor } from '../../domain/policies/ride-transition.policy';
import { RideRepository } from '../../domain/repositories/ride.repository';

@Injectable()
export class GetActiveRideUseCase {
  constructor(private readonly rides: RideRepository) {}

  execute(actor: RideActor) {
    return this.rides.findActiveForActor(actor);
  }
}
