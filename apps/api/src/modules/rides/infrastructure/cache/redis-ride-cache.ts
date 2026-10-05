import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@/infrastructure/cache/redis.service';
import { RideCache } from '../../application/contracts/ride-cache';
import { Ride, RideProps } from '../../domain/entities/ride.entity';

export const RIDE_CACHE_TTL_SECONDS = 30;

type CachedRide = Omit<RideProps, 'createdAt' | 'updatedAt'> & {
  version: number;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class RedisRideCache extends RideCache {
  private readonly logger = new Logger(RedisRideCache.name);

  constructor(private readonly redis: RedisService) {
    super();
  }

  async get(rideId: string): Promise<Ride | null> {
    try {
      const data = await this.redis.get<CachedRide>(`ride:${rideId}`);
      if (!data) return null;
      if (data.version !== 1 || data.id !== rideId) return null;

      return new Ride({
        id: data.id,
        riderId: data.riderId,
        driverId: data.driverId,
        status: data.status,
        pickupLat: data.pickupLat,
        pickupLng: data.pickupLng,
        dropoffLat: data.dropoffLat,
        dropoffLng: data.dropoffLng,
        fare: data.fare,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      });
    } catch {
      this.logger.warn(`Ride ${rideId} cache read failed; using database`);
      return null;
    }
  }

  async set(ride: Ride): Promise<void> {
    try {
      await this.redis.set(
        `ride:${ride.id}`,
        { ...ride.toSafeObject(), version: 1 },
        RIDE_CACHE_TTL_SECONDS,
      );
    } catch {
      this.logger.warn(`Ride ${ride.id} cache write failed`);
    }
  }

  async invalidate(rideId: string): Promise<void> {
    try {
      await this.redis.remove(`ride:${rideId}`);
    } catch {
      this.logger.warn(
        `Ride ${rideId} cache invalidation failed; TTL limits staleness`,
      );
    }
  }
}
