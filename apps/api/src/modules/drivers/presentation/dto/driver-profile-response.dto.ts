import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';

export class VehicleResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  driverProfileId!: string;

  @ApiProperty({ enum: VehicleType })
  type!: VehicleType;

  @ApiProperty()
  make!: string;

  @ApiProperty()
  model!: string;

  @ApiProperty()
  color!: string;

  @ApiPropertyOptional({ nullable: true })
  year!: number | null;

  @ApiProperty()
  licensePlate!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}

export class DriverProfileResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty({ enum: DriverStatus })
  status!: DriverStatus;

  @ApiPropertyOptional({ type: VehicleResponseDto, nullable: true })
  vehicle!: VehicleResponseDto | null;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}
