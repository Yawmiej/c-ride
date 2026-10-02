import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationError } from '../../application/errors/authentication.error';
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
    if (!match?.[1]) throw new UnauthorizedException('Invalid authentication');
    try {
      request.user = await this.authenticateUser.execute(match[1]);
      return true;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new UnauthorizedException('Invalid authentication');
      }
      throw error;
    }
  }
}
