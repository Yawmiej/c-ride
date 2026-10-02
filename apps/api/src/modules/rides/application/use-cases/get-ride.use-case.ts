import { Injectable } from '@nestjs/common';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';

@Injectable()
export class GetRideUseCase {
  constructor(private readonly rides: RideRepository) {}

  execute(id: string): Promise<Ride | null> {
    return this.rides.findById(id);
  }
}
