import { Ride } from '../entities/ride.entity';

export abstract class RideRepository {
  abstract create(ride: Ride): Promise<Ride>;
  abstract findById(id: string): Promise<Ride | null>;
  abstract findAvailable(): Promise<Ride[]>;
}
