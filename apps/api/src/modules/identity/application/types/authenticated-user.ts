import { UserRole } from '../../domain/enums/user-role.enum';

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}
