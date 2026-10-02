import { Vehicle } from '../entities/vehicle.entity';

export abstract class VehicleRepository {
  abstract findById(id: string): Promise<Vehicle | null>;
  abstract findByDriverProfileId(driverProfileId: string): Promise<Vehicle | null>;
  abstract findByLicensePlate(licensePlate: string): Promise<Vehicle | null>;
}
