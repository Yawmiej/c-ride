import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenClaims,
  AccessTokenService,
} from '../../application/contracts/access-token.service';
import { UserRole } from '../../domain/enums/user-role.enum';

@Injectable()
export class JwtAccessTokenService implements AccessTokenService {
  constructor(private readonly jwt: JwtService) {}

  issue(claims: AccessTokenClaims): Promise<string> {
    return this.jwt.signAsync({ sub: claims.sub, role: claims.role });
  }

  async verify(token: string): Promise<AccessTokenClaims | null> {
    try {
      const claims = await this.jwt.verifyAsync<Record<string, unknown>>(token);

      if (
        typeof claims.sub !== 'string' ||
        claims.sub.length === 0 ||
        !Object.values(UserRole).includes(claims.role as UserRole) ||
        typeof claims.exp !== 'number' ||
        !Number.isFinite(claims.exp)
      ) {
        return null;
      }

      return { sub: claims.sub, role: claims.role as UserRole };
    } catch {
      return null;
    }
  }
}
