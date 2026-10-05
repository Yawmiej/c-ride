import { ApiProperty } from '@nestjs/swagger';
import { RideResponseDto } from './ride-response.dto';

export class RideHistoryResponseDto {
  @ApiProperty({ type: [RideResponseDto] })
  items!: RideResponseDto[];

  @ApiProperty({ example: 25 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 20 })
  limit!: number;
}
