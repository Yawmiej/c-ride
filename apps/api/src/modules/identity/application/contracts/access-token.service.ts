import { UserRole } from '../../domain/enums/user-role.enum';

export interface AccessTokenClaims {
  sub: string;
  role: UserRole;
}

export abstract class AccessTokenService {
  abstract issue(claims: AccessTokenClaims): Promise<string>;
  abstract verify(token: string): Promise<AccessTokenClaims | null>;
}
