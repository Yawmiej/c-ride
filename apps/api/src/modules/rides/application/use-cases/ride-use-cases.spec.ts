import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { CreateRideUseCase } from './create-ride.use-case';
import { GetRideUseCase } from './get-ride.use-case';
import { ListAvailableRidesUseCase } from './list-available-rides.use-case';

class InMemoryRideRepository extends RideRepository {
  created: Ride | null = null;
  rideById: Ride | null = null;
  available: Ride[] = [];

  async create(ride: Ride): Promise<Ride> {
    this.created = ride;
    return ride;
  }

  async findById(): Promise<Ride | null> {
    return this.rideById;
  }

  async findAvailable(): Promise<Ride[]> {
    return this.available;
  }
}

describe('Ride use cases', () => {
  const ride = new Ride({
    id: 'ride-id',
    riderId: 'rider-id',
    driverId: null,
    status: RideStatus.REQUESTED,
    pickupLat: 6.5244,
    pickupLng: 3.3792,
    dropoffLat: 6.6018,
    dropoffLng: 3.3515,
    fare: '1500.00',
    createdAt: new Date('2026-10-02T12:00:00.000Z'),
    updatedAt: new Date('2026-10-02T12:00:00.000Z'),
  });

  it('persists a domain ride through the repository contract', async () => {
    const repository = new InMemoryRideRepository();

    await expect(new CreateRideUseCase(repository).execute(ride)).resolves.toBe(
      ride,
    );
    expect(repository.created).toBe(ride);
  });

  it('loads one ride by its identifier', async () => {
    const repository = new InMemoryRideRepository();
    repository.rideById = ride;

    await expect(
      new GetRideUseCase(repository).execute('ride-id'),
    ).resolves.toBe(ride);
  });

  it('delegates requested and unassigned ride lookup to the repository', async () => {
    const repository = new InMemoryRideRepository();
    repository.available = [ride];

    await expect(
      new ListAvailableRidesUseCase(repository).execute(),
    ).resolves.toEqual([ride]);
  });
});
