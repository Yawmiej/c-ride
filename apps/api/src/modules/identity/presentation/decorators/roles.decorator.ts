import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../domain/enums/user-role.enum';

export const ROLES_METADATA_KEY = 'identity:roles';
export const Roles = (...roles: UserRole[]) =>
  SetMetadata(ROLES_METADATA_KEY, roles);
