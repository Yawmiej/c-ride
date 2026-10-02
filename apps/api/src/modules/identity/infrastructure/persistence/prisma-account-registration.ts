import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { PrismaDriverRegistration } from '../../../drivers/infrastructure/persistence/prisma-driver-creation';
import {
  AccountRegistration,
  RegisteredAccount,
} from '../../application/contracts/account-registration';
import { RegistrationConflictError } from '../../application/errors/registration-conflict.error';
import { User } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserMapper } from './user.mapper';

@Injectable()
export class PrismaAccountRegistration implements AccountRegistration {
  constructor(
    private readonly prisma: PrismaService,
    private readonly drivers: PrismaDriverRegistration,
  ) {}

  async create(user: User): Promise<RegisteredAccount> {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const created = await transaction.user.create({
          data: UserMapper.toPersistence(user),
        });
        const driverProfile =
          user.role === UserRole.DRIVER
            ? await this.drivers.createEmpty(created.id, transaction)
            : null;
        return { user: UserMapper.toDomain(created), driverProfile };
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new RegistrationConflictError();
      }
      throw error;
    }
  }
}
