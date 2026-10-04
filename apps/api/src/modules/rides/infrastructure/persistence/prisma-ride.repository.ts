import { RideEvent } from '../../domain/entities/ride-event.entity';
import { RideEventMapper } from './ride-event.mapper';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { Ride } from '../../domain/entities/ride.entity';
import { RideRepository } from '../../domain/repositories/ride.repository';
import { RideMapper } from './ride.mapper';

@Injectable()
export class PrismaRideRepository implements RideRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ride: Ride, event: RideEvent): Promise<Ride> {
    return this.prisma.$transaction(async (transaction) => {
      const created = await transaction.ride.create({
        data: ride.toSafeObject(),
      });
      await transaction.rideEvent.create({
        data: RideEventMapper.toPersistence(event),
      });
      return RideMapper.toDomain(created);
    });
  }

  async updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
  ): Promise<Ride | null> {
    const [saved] = await this.prisma.ride.updateManyAndReturn({
      where: {
        id: ride.id,
        status: expectedStatus,
        riderId: ride.riderId,
        driverId: ride.driverId,
      },
      data: { status: ride.status },
    });
    return saved ? RideMapper.toDomain(saved) : null;
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    return ride ? RideMapper.toDomain(ride) : null;
  }
}
