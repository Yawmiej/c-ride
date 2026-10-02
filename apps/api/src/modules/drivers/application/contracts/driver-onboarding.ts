import { DriverProfile } from '../../domain/entities/driver-profile.entity';
import { Vehicle } from '../../domain/entities/vehicle.entity';

export interface DriverOnboardingInput {
  profile: DriverProfile;
  vehicle: Vehicle;
}

export abstract class DriverOnboarding {
  abstract onboard(input: DriverOnboardingInput): Promise<DriverProfile>;
}
