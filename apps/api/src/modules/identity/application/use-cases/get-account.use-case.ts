import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserStatus } from '../../domain/enums/user-status.enum';

export interface AccountResult {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
}

@Injectable()
export class GetAccountUseCase {
  constructor(private readonly users: UserRepository) {}

  async execute(userId: string): Promise<AccountResult | null> {
    const user = await this.users.findById(userId);
    return user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          status: user.status,
        }
      : null;
  }
}
