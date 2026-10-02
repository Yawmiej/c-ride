import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User, UserEntity } from '../../domain/entities/user.entity';
import { UserStatus } from '../../domain/enums/user-status.enum';
import { UserRepository } from '../../domain/repositories/user.repository';
import {
  RegisterUserCommand,
  toRegisterUserCommand,
} from '../commands/register-user.command';
import { AccountRegistration } from '../contracts/account-registration';
import { AccessTokenService } from '../contracts/access-token.service';
import { PasswordHasher } from '../contracts/password-hasher';
import { RegistrationConflictError } from '../errors/registration-conflict.error';

export interface RegisterUserResult {
  accessToken: string;
  user: UserEntity;
}

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly users: UserRepository,
    private readonly passwords: PasswordHasher,
    private readonly registration: AccountRegistration,
    private readonly tokens: AccessTokenService,
  ) {}

  async execute(input: RegisterUserCommand): Promise<RegisterUserResult> {
    const command = toRegisterUserCommand(input);

    if (await this.users.findByEmail(command.email)) {
      throw new RegistrationConflictError();
    }

    if (
      command.phoneNumber &&
      (await this.users.findByPhoneNumber(command.phoneNumber))
    ) {
      throw new RegistrationConflictError();
    }

    const passwordHash = await this.passwords.hash(command.password);
    const now = new Date();
    const user = await this.registration.create(
      new User({
        id: randomUUID(),
        firstName: command.firstName,
        lastName: command.lastName,
        email: command.email,
        phoneNumber: command.phoneNumber ?? null,
        passwordHash,
        role: command.role,
        status: UserStatus.ACTIVE,
        createdAt: now,
        updatedAt: now,
      }),
    );
    const accessToken = await this.tokens.issue({
      sub: user.id,
      role: user.role,
    });
    return { accessToken, user: user.toSafeObject() };
  }
}
