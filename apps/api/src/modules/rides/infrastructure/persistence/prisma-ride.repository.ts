import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { RideMapper } from './ride.mapper';

@Injectable()
export class PrismaRideRepository implements RideRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ride: Ride): Promise<Ride> {
    const data = ride.toSafeObject();
    const created = await this.prisma.ride.create({
      data: {
        id: data.id,
        riderId: data.riderId,
        driverId: data.driverId,
        status: data.status,
        pickupLat: data.pickupLat,
        pickupLng: data.pickupLng,
        dropoffLat: data.dropoffLat,
        dropoffLng: data.dropoffLng,
        fare: data.fare,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
    return RideMapper.toDomain(created);
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    return ride ? RideMapper.toDomain(ride) : null;
  }
}
