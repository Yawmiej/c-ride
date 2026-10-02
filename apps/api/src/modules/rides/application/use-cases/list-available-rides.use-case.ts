import { Injectable } from '@nestjs/common';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';

@Injectable()
export class ListAvailableRidesUseCase {
  constructor(private readonly rides: RideRepository) {}

  execute(): Promise<Ride[]> {
    return this.rides.findAvailable();
  }
}
