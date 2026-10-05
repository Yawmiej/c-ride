import { Injectable } from '@nestjs/common';
import { GetAccountUseCase } from '../../../identity/application/use-cases/get-account.use-case';
import { GetDriverProfileUseCase } from '../../../drivers/application/use-cases/get-driver-profile.use-case';
import { Ride } from '../../domain/entities/ride.entity';
import { GetRideCommand, GetRideUseCase } from './get-ride.use-case';

export interface RideDriverDetails {
  id: string;
  firstName: string;
  lastName: string;
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
  } | null;
}

export interface RideDetailsResult {
  ride: Ride;
  driver: RideDriverDetails | null;
}

@Injectable()
export class GetRideDetailsUseCase {
  constructor(
    private readonly getRide: GetRideUseCase,
    private readonly getAccount: GetAccountUseCase,
    private readonly getDriverProfile: GetDriverProfileUseCase,
  ) {}

  async execute(command: GetRideCommand): Promise<RideDetailsResult> {
    // Authorize the ride participant before reading the assigned driver's data.
    const ride = await this.getRide.execute(command);
    if (!ride.driverId) return { ride, driver: null };

    const [account, profile] = await Promise.all([
      this.getAccount.execute(ride.driverId),
      this.getDriverProfile.execute(ride.driverId),
    ]);
    if (!account) return { ride, driver: null };

    const vehicle = profile?.vehicle;
    return {
      ride,
      driver: {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        vehicle: vehicle
          ? {
              make: vehicle.make,
              model: vehicle.model,
              color: vehicle.color,
              licensePlate: vehicle.licensePlate,
            }
          : null,
      },
    };
  }
}
