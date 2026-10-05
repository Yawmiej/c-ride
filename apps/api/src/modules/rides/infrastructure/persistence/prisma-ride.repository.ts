import { Prisma } from '@/generated/prisma';
import { RideEvent } from '../../domain/entities/ride-event.entity';
import { RideEventMapper } from './ride-event.mapper';
import { RideStatus } from '../../domain/enums/ride-status.enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { Ride } from '../../domain/entities/ride.entity';
import {
  RideRepository,
  RideMutationResult,
  RideHistoryQuery,
  RideHistoryResult,
} from '../../domain/repositories/ride.repository';
import { RideMapper } from './ride.mapper';

@Injectable()
export class PrismaRideRepository implements RideRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(ride: Ride, event: RideEvent): Promise<RideMutationResult> {
    return this.prisma.$transaction(async (transaction) => {
      const created = await transaction.ride.create({
        data: ride.toSafeObject(),
      });
      const savedEvent = await transaction.rideEvent.create({
        data: RideEventMapper.toPersistence(event),
      });
      return {
        ride: RideMapper.toDomain(created),
        event: RideEventMapper.toDomain(savedEvent),
      };
    });
  }

  async updateStatus(
    ride: Ride,
    expectedStatus: RideStatus,
    event: RideEvent,
  ): Promise<RideMutationResult | null> {
    return this.prisma.$transaction(async (transaction) => {
      const [saved] = await transaction.ride.updateManyAndReturn({
        where: {
          id: ride.id,
          status: expectedStatus,
          riderId: ride.riderId,
          driverId: ride.driverId,
        },
        data: { status: ride.status, updatedAt: ride.updatedAt },
      });
      if (!saved) return null;

      const savedEvent = await transaction.rideEvent.create({
        data: RideEventMapper.toPersistence(event),
      });
      return {
        ride: RideMapper.toDomain(saved),
        event: RideEventMapper.toDomain(savedEvent),
      };
    });
  }

  async listHistory(query: RideHistoryQuery): Promise<RideHistoryResult> {
    const participant =
      query.actor.role === 'RIDER'
        ? { riderId: query.actor.id }
        : { driverId: query.actor.id };

    const where: Prisma.RideWhereInput = {
      ...participant,
      status: {
        in: [RideStatus.COMPLETED, RideStatus.CANCELLED],
      },
    };
    const [rides, total] = await this.prisma.$transaction(
      [
        this.prisma.ride.findMany({
          where,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
          skip: (query.page - 1) * query.limit,
          take: query.limit,
        }),
        this.prisma.ride.count({ where }),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return { items: rides.map(RideMapper.toDomain), total };
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    return ride ? RideMapper.toDomain(ride) : null;
  }
}
