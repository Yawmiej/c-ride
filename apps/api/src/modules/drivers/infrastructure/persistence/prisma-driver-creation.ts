import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { DriverProfileMapper } from './driver-profile.mapper';
import { Prisma } from '@/generated/prisma';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';

@Injectable()
export class PrismaDriverCreation {
  async createEmpty(
    userId: string,
    transaction: Prisma.TransactionClient,
  ): Promise<DriverProfile> {
    const profile = DriverProfile.empty(randomUUID(), userId);
    const created = await transaction.driverProfile.create({
      data: {
        id: profile.id,
        userId: profile.userId,
        status: profile.status,
        isAvailable: profile.isAvailable,
      },
      include: { vehicle: true },
    });
    return DriverProfileMapper.toDomain(created);
  }
}
