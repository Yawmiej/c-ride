import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

const finiteNumber = { allowNaN: false, allowInfinity: false };

export class CreateRideDto {
  @ApiProperty({ minimum: -90, maximum: 90, example: 6.5244 })
  @IsNumber(finiteNumber)
  @Min(-90)
  @Max(90)
  pickupLat!: number;

  @ApiProperty({ minimum: -180, maximum: 180, example: 3.3792 })
  @IsNumber(finiteNumber)
  @Min(-180)
  @Max(180)
  pickupLng!: number;

  @ApiProperty({ minimum: -90, maximum: 90, example: 6.6018 })
  @IsNumber(finiteNumber)
  @Min(-90)
  @Max(90)
  dropoffLat!: number;

  @ApiProperty({ minimum: -180, maximum: 180, example: 3.3515 })
  @IsNumber(finiteNumber)
  @Min(-180)
  @Max(180)
  dropoffLng!: number;
}
