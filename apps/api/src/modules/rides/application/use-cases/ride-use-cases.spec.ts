import { PublishRideStatusUseCase } from './publish-ride-status.use-case';
import { RideEvent } from '../../domain/entities/ride-event.entity';
import {
  RideMutationResult,
  RideHistoryResult,
} from '../../domain/repositories/ride.repository';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { CreateRideUseCase } from './create-ride.use-case';
import { GetRideUseCase } from './get-ride.use-case';

class InMemoryRideRepository extends RideRepository {
  created: Ride | null = null;
  rideById: Ride | null = null;
  requestedId: string | null = null;
  allowCreate = true;

  async updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
    event: RideEvent,
  ): Promise<RideMutationResult | null> {
    if (
      this.rideById?.id !== ride.id ||
      this.rideById.status !== expectedStatus ||
      this.rideById.riderId !== ride.riderId ||
      this.rideById.driverId !== ride.driverId
    )
      return null;
    this.rideById = ride;
    return { ride, event };
  }

  async create(
    ride: Ride,
    event: RideEvent,
  ): Promise<RideMutationResult | null> {
    if (!this.allowCreate) return null;
    this.created = ride;
    return { ride, event };
  }

  async listAvailable(): Promise<Ride[]> {
    return [];
  }

  async findActiveForActor(): Promise<Ride | null> {
    return null;
  }

  async listHistory(): Promise<RideHistoryResult> {
    return { items: [], total: 0 };
  }

  async findById(id: string): Promise<Ride | null> {
    this.requestedId = id;
    return this.rideById;
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

    const created = await new CreateRideUseCase(
      repository,
      new PublishRideStatusUseCase(
        {
          publishStatusChanged: () => {},
          publishLocationUpdated: () => {},
        },
        { publish: async () => {} },
      ),
    ).execute({
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
      new CreateRideUseCase(
        repository,
        new PublishRideStatusUseCase(
          {
            publishStatusChanged: () => {},
            publishLocationUpdated: () => {},
          },
          { publish: async () => {} },
        ),
      ).execute({
        riderId: 'rider-id',
        pickupLat: 91,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      }),
    ).rejects.toBeInstanceOf(RangeError);
    expect(repository.created).toBeNull();
  });

  it('rejects a new ride when the rider already has an active ride', async () => {
    const repository = new InMemoryRideRepository();
    repository.allowCreate = false;

    await expect(
      new CreateRideUseCase(
        repository,
        new PublishRideStatusUseCase(
          {
            publishStatusChanged: () => {},
            publishLocationUpdated: () => {},
          },
          { publish: async () => {} },
        ),
      ).execute({
        riderId: 'rider-id',
        pickupLat: 6.5244,
        pickupLng: 3.3792,
        dropoffLat: 6.6018,
        dropoffLng: 3.3515,
      }),
    ).rejects.toMatchObject({ kind: ERROR_KINDS.CONFLICT });
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
});
