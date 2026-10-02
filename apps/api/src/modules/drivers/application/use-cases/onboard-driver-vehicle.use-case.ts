import { Injectable } from '@nestjs/common';
import { DriverProfileRepository } from '../../domain/repositories/driver-profile.repository';
import { VehicleRepository } from '../../domain/repositories/vehicle.repository';

/**
 * Application entry point for vehicle onboarding. Its command and mutation
 * contract are introduced with the validated vehicle input in sections 3.8–3.9.
 */
@Injectable()
export class OnboardDriverVehicleUseCase {
  constructor(
    private readonly profiles: DriverProfileRepository,
    private readonly vehicles: VehicleRepository,
  ) {}

  get dependencies() {
    return { profiles: this.profiles, vehicles: this.vehicles };
  }
}
