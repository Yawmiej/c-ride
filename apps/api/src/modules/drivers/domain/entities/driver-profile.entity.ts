import { DriverStatus } from '../enums/driver-status.enum';

export class DriverProfile {
  readonly status = DriverStatus.PENDING_ONBOARDING;
  readonly isAvailable = false;

  constructor(readonly userId: string) {}
}
