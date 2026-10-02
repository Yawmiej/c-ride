import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';

@Injectable()
export class PrismaDriverRegistration {
  async createEmpty(
    userId: string,
    transaction: Prisma.TransactionClient,
  ): Promise<void> {
    const profile = new DriverProfile(userId);
    await transaction.driverProfile.create({
      data: {
        userId: profile.userId,
        status: profile.status,
        isAvailable: profile.isAvailable,
      },
    });
  }
}
