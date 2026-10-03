import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authenticateUser: AuthenticateUserUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const match = /^Bearer ([^\s]+)$/i.exec(
      request.headers.authorization ?? '',
    );
    if (!match?.[1]) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_AUTHENTICATION);
    }
    try {
      request.user = await this.authenticateUser.execute(match[1]);
      return true;
    } catch (error) {
      if (
        error instanceof ApplicationError &&
        error.kind === ERROR_KINDS.AUTHENTICATION
      ) {
        throw new UnauthorizedException(ERROR_MESSAGES.INVALID_AUTHENTICATION);
      }
      throw error;
    }
  }
}
