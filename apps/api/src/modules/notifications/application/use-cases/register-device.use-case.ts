import { Injectable } from '@nestjs/common';
import { DevicePlatform } from '../../domain/enums/device-platform.enum';
import { UserDeviceRepository } from '../../domain/repositories/user-device.repository';

export interface RegisterDeviceCommand {
  userId: string;
  token: string;
  platform: DevicePlatform;
}

@Injectable()
export class RegisterDeviceUseCase {
  constructor(private readonly devices: UserDeviceRepository) {}

  execute(command: RegisterDeviceCommand) {
    return this.devices.register(
      command.userId,
      command.token,
      command.platform,
    );
  }
}
