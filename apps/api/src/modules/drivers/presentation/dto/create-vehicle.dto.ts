import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { VehicleType } from '../../domain/enums/vehicle-type.enum';

export const MIN_VEHICLE_YEAR = 1900;
export const MAX_VEHICLE_YEAR = new Date().getFullYear() + 1;
export const LICENSE_PLATE_PATTERN =
  /^[A-Z0-9]{2,4}-[A-Z0-9]{2,4}-[A-Z0-9]{1,4}$/;

export function normalizeLicensePlate(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const trimText = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const explicitInteger = ({ value }: { value: unknown }) =>
  typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;

export class CreateVehicleDto {
  @ApiProperty({ enum: VehicleType, example: VehicleType.SEDAN })
  @IsEnum(VehicleType)
  type!: VehicleType;

  @ApiProperty({ example: 'Toyota' })
  @Transform(trimText)
  @IsString()
  @IsNotEmpty()
  make!: string;

  @ApiProperty({ example: 'Corolla' })
  @Transform(trimText)
  @IsString()
  @IsNotEmpty()
  model!: string;

  @ApiProperty({ example: 'Silver' })
  @Transform(trimText)
  @IsString()
  @IsNotEmpty()
  color!: string;

  @ApiPropertyOptional({
    minimum: MIN_VEHICLE_YEAR,
    maximum: MAX_VEHICLE_YEAR,
    example: 2022,
  })
  @IsOptional()
  @Transform(explicitInteger)
  @IsInt()
  @Min(MIN_VEHICLE_YEAR)
  @Max(MAX_VEHICLE_YEAR)
  year?: number;

  @ApiProperty({ example: 'LAG-123-AB' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? normalizeLicensePlate(value) : value,
  )
  @IsString()
  @Matches(LICENSE_PLATE_PATTERN, {
    message:
      'licensePlate must use 2-4 alphanumeric groups separated by hyphens',
  })
  licensePlate!: string;
}
