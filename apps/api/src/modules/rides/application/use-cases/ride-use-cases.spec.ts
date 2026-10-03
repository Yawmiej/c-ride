import { ERROR_KINDS } from '@/shared/errors/error-kinds';
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
  requestedId: string | null = null;

  async create(ride: Ride): Promise<Ride> {
    this.created = ride;
    return ride;
  }

  async findById(id: string): Promise<Ride | null> {
    this.requestedId = id;
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

    const created = await new CreateRideUseCase(repository).execute({
      riderId: 'rider-id',
      pickupLat: 6.5244,
      pickupLng: 3.3792,
      dropoffLat: 6.6018,
      dropoffLng: 3.3515,
    });

    expect(repository.created).toBe(created);
    expect(created.toSafeObject()).toEqual(
      expect.objectContaining({
        riderId: 'rider-id',
        driverId: null,
        status: RideStatus.REQUESTED,
        fare: '1000.00',
      }),
    );
    expect(created.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('does not persist invalid coordinates when called outside HTTP', async () => {
    const repository = new InMemoryRideRepository();

    await expect(
      new CreateRideUseCase(repository).execute({
        riderId: 'rider-id',
        pickupLat: 91,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      }),
    ).rejects.toBeInstanceOf(RangeError);
    expect(repository.created).toBeNull();
  });

  it('returns a ride to its owning rider', async () => {
    const repository = new InMemoryRideRepository();
    repository.rideById = ride;

    await expect(
      new GetRideUseCase(repository).execute({
        rideId: 'ride-id',
        actorId: 'rider-id',
      }),
    ).resolves.toBe(ride);
    expect(repository.requestedId).toBe('ride-id');
  });

  it('returns a ride to its assigned driver only', async () => {
    const repository = new InMemoryRideRepository();
    repository.rideById = new Ride({
      ...ride.toSafeObject(),
      driverId: 'driver-id',
    });

    await expect(
      new GetRideUseCase(repository).execute({
        rideId: 'ride-id',
        actorId: 'driver-id',
      }),
    ).resolves.toBe(repository.rideById);
  });

  it('distinguishes missing rides from unrelated-user access', async () => {
    const repository = new InMemoryRideRepository();
    const useCase = new GetRideUseCase(repository);

    await expect(
      useCase.execute({ rideId: 'missing-id', actorId: 'rider-id' }),
    ).rejects.toMatchObject({ kind: ERROR_KINDS.NOT_FOUND });

    repository.rideById = ride;
    await expect(
      useCase.execute({ rideId: 'ride-id', actorId: 'other-user-id' }),
    ).rejects.toMatchObject({ kind: ERROR_KINDS.FORBIDDEN });
  });

  it('delegates requested and unassigned ride lookup to the repository', async () => {
    const repository = new InMemoryRideRepository();
    repository.available = [ride];

    await expect(
      new ListAvailableRidesUseCase(repository).execute(),
    ).resolves.toEqual([ride]);
  });
});
