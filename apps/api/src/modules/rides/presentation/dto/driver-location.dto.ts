import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class DriverLocationDto {
  @IsUUID()
  rideId!: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(-90)
  @Max(90)
  latitude!: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(-180)
  @Max(180)
  longitude!: number;
}
