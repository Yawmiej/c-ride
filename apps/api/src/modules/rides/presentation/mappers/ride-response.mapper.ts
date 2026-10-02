import { Ride } from '../../domain/entities/ride.entity';
import { RideResponseDto } from '../dto/ride-response.dto';

export function toRideResponse(ride: Ride): RideResponseDto {
  return ride.toSafeObject();
}
