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

  async create(
    ride: Ride,
    event: RideEvent,
  ): Promise<RideMutationResult | null> {
    return this.prisma.$transaction(async (transaction) => {
      await transaction.$queryRaw`
        SELECT id FROM "User" WHERE id = ${ride.riderId}::uuid FOR UPDATE
      `;
      const activeRide = await transaction.ride.findFirst({
        where: {
          riderId: ride.riderId,
          status: {
            in: [
              RideStatus.REQUESTED,
              RideStatus.ACCEPTED,
              RideStatus.IN_PROGRESS,
            ],
          },
        },
      });
      if (activeRide) return null;

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

  async listAvailable(): Promise<Ride[]> {
    const rides = await this.prisma.ride.findMany({
      where: { status: RideStatus.REQUESTED, driverId: null },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
    return rides.map(RideMapper.toDomain);
  }

  async findActiveForActor(
    actor: RideHistoryQuery['actor'],
  ): Promise<Ride | null> {
    const participant =
      actor.role === 'RIDER' ? { riderId: actor.id } : { driverId: actor.id };
    const ride = await this.prisma.ride.findFirst({
      where: {
        ...participant,
        status: {
          in: [
            RideStatus.REQUESTED,
            RideStatus.ACCEPTED,
            RideStatus.IN_PROGRESS,
          ],
        },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });
    return ride ? RideMapper.toDomain(ride) : null;
  }

  async findById(id: string): Promise<Ride | null> {
    const ride = await this.prisma.ride.findUnique({ where: { id } });
    return ride ? RideMapper.toDomain(ride) : null;
  }
}
