import { DriverProfile } from '../entities/driver-profile.entity';
import { DriverStatus } from '../enums/driver-status.enum';

export interface DriverAccount {
  id: string;
  role: string;
  status: string;
}

export class DriverEligibilityPolicy {
  static isEligible(
    account: DriverAccount,
    profile: DriverProfile | null,
  ): boolean {
    return (
      account.status === 'ACTIVE' &&
      account.role === 'DRIVER' &&
      profile !== null &&
      profile.userId === account.id &&
      profile.status === DriverStatus.ACTIVE &&
      profile.hasVehicle()
    );
  }
}
