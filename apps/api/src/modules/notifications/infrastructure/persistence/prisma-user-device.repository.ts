import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { UserDevice } from '../../domain/entities/user-device.entity';
import { DevicePlatform } from '../../domain/enums/device-platform.enum';
import { UserDeviceRepository } from '../../domain/repositories/user-device.repository';
import { UserDeviceMapper } from './user-device.mapper';

@Injectable()
export class PrismaUserDeviceRepository implements UserDeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async register(
    userId: string,
    fid: string,
    platform: DevicePlatform,
  ): Promise<UserDevice> {
    const device = await this.prisma.userDevice.upsert({
      where: { fid },
      create: {
        userId,
        fid,
        platform: UserDeviceMapper.toPrismaPlatform(platform),
      },
      update: {
        userId,
        platform: UserDeviceMapper.toPrismaPlatform(platform),
      },
    });
    return UserDeviceMapper.toDomain(device);
  }

  async findByUserId(userId: string): Promise<UserDevice[]> {
    const devices = await this.prisma.userDevice.findMany({
      where: { userId },
    });
    return devices.map(UserDeviceMapper.toDomain);
  }
}
