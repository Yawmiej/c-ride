import { User } from '../../domain/entities/user.entity';
import { DriverProfile } from '../../../drivers/domain/entities/driver-profile.entity';

export interface RegisteredAccount {
  user: User;
  driverProfile: DriverProfile | null;
}

export abstract class AccountRegistration {
  abstract create(user: User): Promise<RegisteredAccount>;
}
