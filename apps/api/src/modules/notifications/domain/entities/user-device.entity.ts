import { DevicePlatform } from '../enums/device-platform.enum';

export interface UserDeviceProps {
  id: string;
  userId: string;
  token: string;
  platform: DevicePlatform;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDevice {
  constructor(private readonly props: UserDeviceProps) {}

  get token() {
    return this.props.token;
  }

  toSafeObject(): Omit<UserDeviceProps, 'token' | 'userId'> {
    return {
      id: this.props.id,
      platform: this.props.platform,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
