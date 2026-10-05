import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { DevicePlatform } from '../../domain/enums/device-platform.enum';

export class RegisterDeviceDto {
  @ApiProperty({ description: 'Firebase Installation ID (FID)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/\S/, { message: 'fid must contain a non-whitespace character' })
  @MaxLength(4096)
  fid!: string;

  @ApiProperty({ enum: DevicePlatform })
  @IsEnum(DevicePlatform)
  platform!: DevicePlatform;
}
