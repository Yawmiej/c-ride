import { ApiProperty } from '@nestjs/swagger';
import { DevicePlatform } from '../../domain/enums/device-platform.enum';

export class DeviceResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ enum: DevicePlatform })
  platform!: DevicePlatform;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
