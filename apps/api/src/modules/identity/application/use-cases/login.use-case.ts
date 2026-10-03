import { Injectable } from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { normalizeEmail } from '../commands/register-user.command';
import { AccessTokenService } from '../contracts/access-token.service';
import { PasswordHasher } from '../contracts/password-hasher';

export interface LoginCommand {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: UserEntity;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwords: PasswordHasher,
    private readonly tokens: AccessTokenService,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    const user = await this.users.findByEmail(normalizeEmail(command.email));
    if (
      !user ||
      !(await this.passwords.verify(user.passwordHash, command.password)) ||
      !user.isActive()
    ) {
      throw new ApplicationError(
        ERROR_KINDS.AUTHENTICATION,
        ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    const accessToken = await this.tokens.issue({
      sub: user.id,
      role: user.role,
    });
    return { accessToken, user: user.toSafeObject() };
  }
}
