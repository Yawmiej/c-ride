import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';

export interface CreateRideCommand {
  riderId: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
}

@Injectable()
export class CreateRideUseCase {
  constructor(private readonly rides: RideRepository) {}

  async execute(command: CreateRideCommand): Promise<Ride> {
    const ride = Ride.requested({ id: randomUUID(), ...command });
    return this.rides.create(ride);
  }
}
