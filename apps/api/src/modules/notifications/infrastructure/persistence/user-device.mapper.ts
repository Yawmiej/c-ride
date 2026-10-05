import {
  DevicePlatform as PrismaDevicePlatform,
  UserDevice as PrismaUserDevice,
} from '@/generated/prisma';
import { UserDevice } from '../../domain/entities/user-device.entity';
import { DevicePlatform } from '../../domain/enums/device-platform.enum';

export class UserDeviceMapper {
  static toDomain(device: PrismaUserDevice): UserDevice {
    return new UserDevice({
      ...device,
      platform: device.platform as DevicePlatform,
    });
  }

  static toPrismaPlatform(platform: DevicePlatform): PrismaDevicePlatform {
    return platform as PrismaDevicePlatform;
  }
}
