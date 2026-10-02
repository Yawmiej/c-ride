import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RideStatus } from '../../domain/enums/ride-status.enum';

export class RideResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ format: 'uuid' })
  riderId!: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  driverId!: string | null;

  @ApiProperty({ enum: RideStatus })
  status!: RideStatus;

  @ApiProperty()
  pickupLat!: number;

  @ApiProperty()
  pickupLng!: number;

  @ApiProperty()
  dropoffLat!: number;

  @ApiProperty()
  dropoffLng!: number;

  @ApiProperty({ example: '1500.00' })
  fare!: string;

  @ApiProperty({ format: 'date-time' })
  createdAt!: Date;

  @ApiProperty({ format: 'date-time' })
  updatedAt!: Date;
}
