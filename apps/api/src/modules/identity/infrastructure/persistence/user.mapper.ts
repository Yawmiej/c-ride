import {
  User as PrismaUser,
  UserRole as PrismaUserRole,
  UserStatus as PrismaUserStatus,
} from '@/generated/prisma';

import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserStatus } from '../../domain/enums/user-status.enum';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return new User({
      id: raw.id,
      email: raw.email,
      passwordHash: raw.passwordHash,
      firstName: raw.firstName,
      lastName: raw.lastName,
      phoneNumber: raw.phoneNumber,
      role: raw.role as UserRole,
      status: raw.status as UserStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role as PrismaUserRole,
      status: user.status as PrismaUserStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
