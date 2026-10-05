import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { RideEvent } from '../../domain/entities/ride-event.entity';
import { RideEventRepository } from '../../domain/repositories/ride-event.repository';
import { RideEventMapper } from './ride-event.mapper';

@Injectable()
export class PrismaRideEventRepository implements RideEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRideId(rideId: string): Promise<RideEvent[]> {
    const events = await this.prisma.rideEvent.findMany({
      where: { rideId },
      orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
    });
    return events.map((event) => RideEventMapper.toDomain(event));
  }
}
