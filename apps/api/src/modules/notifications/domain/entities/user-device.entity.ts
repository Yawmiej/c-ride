import { DevicePlatform } from '../enums/device-platform.enum';

export interface UserDeviceProps {
  id: string;
  userId: string;
  fid: string;
  platform: DevicePlatform;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDevice {
  constructor(private readonly props: UserDeviceProps) {}

  get fid() {
    return this.props.fid;
  }

  toSafeObject(): Omit<UserDeviceProps, 'fid' | 'userId'> {
    return {
      id: this.props.id,
      platform: this.props.platform,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
