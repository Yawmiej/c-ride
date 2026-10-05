import { PublishRideStatusUseCase } from './publish-ride-status.use-case';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { RideEvent } from '../../domain/entities/ride-event.entity';

export interface CreateRideCommand {
  riderId: string;
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
}

@Injectable()
export class CreateRideUseCase {
  constructor(
    private readonly rides: RideRepository,
    private readonly publishStatus: PublishRideStatusUseCase,
  ) {}

  async execute(command: CreateRideCommand): Promise<Ride> {
    const ride = Ride.requested({ id: randomUUID(), ...command });
    const event = RideEvent.requested(randomUUID(), ride);
    const saved = await this.rides.create(ride, event);
    await this.publishStatus.execute(saved);
    return saved.ride;
  }
}
