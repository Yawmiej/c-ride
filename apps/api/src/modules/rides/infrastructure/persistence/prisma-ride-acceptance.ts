import { RideEvent } from '../../domain/entities/ride-event.entity';
import { RideEventMapper } from './ride-event.mapper';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { PrismaDriverEligibility } from '../../../drivers/infrastructure/persistence/prisma-driver-eligibility';
import {
  RideAcceptance,
  RideAcceptanceResult,
} from '../../application/contracts/ride-acceptance';
import { RideMapper } from './ride.mapper';

@Injectable()
export class PrismaRideAcceptance implements RideAcceptance {
  constructor(
    private readonly prisma: PrismaService,
    private readonly drivers: PrismaDriverEligibility,
  ) {}

  async accept(
    rideId: string,
    driverId: string,
    event: RideEvent,
  ): Promise<RideAcceptanceResult> {
    return this.prisma.$transaction(
      async (transaction): Promise<RideAcceptanceResult> => {
        if (!(await this.drivers.lockAndCheck(transaction, driverId))) {
          return { outcome: 'ineligible' };
        }

        const updated = await transaction.ride.updateMany({
          where: { id: rideId, status: 'REQUESTED', driverId: null },
          data: {
            driverId,
            status: 'ACCEPTED',
            updatedAt: event.toSafeObject().createdAt,
          },
        });
        if (updated.count === 0) return { outcome: 'conflict' };

        await transaction.rideEvent.create({
          data: RideEventMapper.toPersistence(event),
        });

        const saved = await transaction.ride.findUniqueOrThrow({
          where: { id: rideId },
        });
        return { outcome: 'accepted', ride: RideMapper.toDomain(saved) };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
    );
  }
}
