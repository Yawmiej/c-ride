import { Injectable } from '@nestjs/common';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';

@Injectable()
export class CreateRideUseCase {
  constructor(private readonly rides: RideRepository) {}

  async execute(ride: Ride): Promise<Ride> {
    return this.rides.create(ride);
  }
}
