import { DriverProfileData } from '../../domain/entities/driver-profile.entity';
import { DriverProfileResponseDto } from '../dto/driver-profile-response.dto';

export function toDriverProfileResponse(
  profile: DriverProfileData,
): DriverProfileResponseDto {
  return profile;
}
