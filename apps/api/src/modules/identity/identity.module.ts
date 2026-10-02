import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class IdentityModule {}
