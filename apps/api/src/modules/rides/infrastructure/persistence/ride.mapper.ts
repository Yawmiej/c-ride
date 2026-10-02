import { Prisma } from '@/generated/prisma';
import { Ride } from '../../domain/entities/ride.entity';
import { RideStatus } from '../../domain/enums/ride-status.enum';

type PrismaRide = Prisma.RideGetPayload<Record<string, never>>;

export class RideMapper {
  static toDomain(raw: PrismaRide): Ride {
    return new Ride({
      id: raw.id,
      riderId: raw.riderId,
      driverId: raw.driverId,
      status: raw.status as RideStatus,
      pickupLat: raw.pickupLat,
      pickupLng: raw.pickupLng,
      dropoffLat: raw.dropoffLat,
      dropoffLng: raw.dropoffLng,
      fare: raw.fare.toFixed(2),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
