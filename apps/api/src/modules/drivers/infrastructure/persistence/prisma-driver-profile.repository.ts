import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';
import { DriverProfileMapper } from './driver-profile.mapper';

@Injectable()
export class PrismaDriverProfileRepository implements DriverProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<DriverProfile | null> {
    const profile = await this.prisma.driverProfile.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    return profile ? DriverProfileMapper.toDomain(profile) : null;
  }

  async findByUserId(userId: string): Promise<DriverProfile | null> {
    const profile = await this.prisma.driverProfile.findUnique({
      where: { userId },
      include: { vehicle: true },
    });
    return profile ? DriverProfileMapper.toDomain(profile) : null;
  }
}
