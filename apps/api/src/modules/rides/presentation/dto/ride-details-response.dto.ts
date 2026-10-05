import { ApiProperty } from '@nestjs/swagger';
import { RideResponseDto } from './ride-response.dto';

export class RideDriverVehicleResponseDto {
  @ApiProperty()
  make!: string;

  @ApiProperty()
  model!: string;

  @ApiProperty()
  color!: string;

  @ApiProperty()
  licensePlate!: string;
}

export class RideDriverResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty({ type: RideDriverVehicleResponseDto, nullable: true })
  vehicle!: RideDriverVehicleResponseDto | null;
}

export class RideDetailsResponseDto extends RideResponseDto {
  @ApiProperty({ type: RideDriverResponseDto, nullable: true })
  driver!: RideDriverResponseDto | null;
}
