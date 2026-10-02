import { User } from '../../domain/entities/user.entity';

export abstract class AccountRegistration {
  abstract create(user: User): Promise<User>;
}
