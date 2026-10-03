import { Injectable } from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AccessTokenService } from '../contracts/access-token.service';
import { AuthenticatedUser } from '../types/authenticated-user';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly tokens: AccessTokenService,
    private readonly users: UserRepository,
  ) {}

  async execute(token: string): Promise<AuthenticatedUser> {
    const claims = await this.tokens.verify(token);
    if (
      !claims ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        claims.sub,
      )
    ) {
      throw new ApplicationError(
        ERROR_KINDS.AUTHENTICATION,
        ERROR_MESSAGES.INVALID_AUTHENTICATION,
      );
    }
    const user = await this.users.findById(claims.sub);
    if (!user?.isActive()) {
      throw new ApplicationError(
        ERROR_KINDS.AUTHENTICATION,
        ERROR_MESSAGES.INVALID_AUTHENTICATION,
      );
    }
    return { id: user.id, role: user.role };
  }
}
