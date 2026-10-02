import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { AccessTokenService } from '../contracts/access-token.service';
import { AuthenticationError } from '../errors/authentication.error';
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
      throw new AuthenticationError();
    }
    const user = await this.users.findById(claims.sub);
    if (!user?.isActive()) throw new AuthenticationError();
    return { id: user.id, role: user.role };
  }
}
