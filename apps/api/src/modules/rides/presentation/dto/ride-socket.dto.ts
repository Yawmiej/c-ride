import { IsUUID } from 'class-validator';
import { RideResponseDto } from './ride-response.dto';
import { ApplicationErrorKind } from '@/shared/errors/error-kinds';

export class JoinRideDto {
  @IsUUID()
  rideId!: string;
}

export interface RideJoinedDto {
  rideId: string;
}

export interface AvailableRidesDto {
  items: RideResponseDto[];
}

export interface RideSocketErrorDto {
  event: string;
  code: ApplicationErrorKind | 'validation' | 'internal';
  message: string;
}
