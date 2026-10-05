import { UserDevice } from '../entities/user-device.entity';
import { DevicePlatform } from '../enums/device-platform.enum';

export abstract class UserDeviceRepository {
  abstract register(
    userId: string,
    fid: string,
    platform: DevicePlatform,
  ): Promise<UserDevice>;

  abstract findByUserId(userId: string): Promise<UserDevice[]>;
}
