import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';

import { PrismaService } from '@/infrastructure/database/prisma.service';
import { ApplicationError } from '@/shared/errors/application-error';
import { ERROR_KINDS } from '@/shared/errors/error-kinds';
import { ERROR_MESSAGES } from '@/shared/errors/error-messages';

import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserMapper } from './user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { phoneNumber },
    });

    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    try {
      const created = await this.prisma.user.create({
        data: UserMapper.toPersistence(user),
      });

      return UserMapper.toDomain(created);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ApplicationError(
          ERROR_KINDS.CONFLICT,
          ERROR_MESSAGES.REGISTRATION_CONFLICT,
        );
      }
      throw error;
    }
  }
}
