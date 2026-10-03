import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RideIdParamDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  id!: string;
}
