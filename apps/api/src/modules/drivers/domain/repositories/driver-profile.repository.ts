import { DriverProfile } from '../entities/driver-profile.entity';

export abstract class DriverProfileRepository {
  abstract findById(id: string): Promise<DriverProfile | null>;
  abstract findByUserId(userId: string): Promise<DriverProfile | null>;
}
