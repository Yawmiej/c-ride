import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { RideStatus } from '../../domain/enums/ride-status.enum';

const UPDATABLE_RIDE_STATUSES = [
  RideStatus.IN_PROGRESS,
  RideStatus.COMPLETED,
  RideStatus.CANCELLED,
] as const;

export class UpdateRideStatusDto {
  @ApiProperty({
    enum: UPDATABLE_RIDE_STATUSES,
    example: RideStatus.IN_PROGRESS,
  })
  @IsIn(UPDATABLE_RIDE_STATUSES)
  status!: (typeof UPDATABLE_RIDE_STATUSES)[number];
}
