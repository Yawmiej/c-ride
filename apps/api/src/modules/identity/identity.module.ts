import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { DatabaseModule } from '../../infrastructure/database/database.module';
import { AccessTokenService } from './application/contracts/access-token.service';
import { PasswordHasher } from './application/contracts/password-hasher';
import { UserRepository } from './domain/repositories/user.repository';
import { Argon2PasswordHasher } from './infrastructure/auth/argon2-password-hasher';
import { JwtAccessTokenService } from './infrastructure/auth/jwt-access-token.service';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { AuthController } from './presentation/controllers/auth.controller';
import { DriversModule } from '../drivers/drivers.module';
import { AccountRegistration } from './application/contracts/account-registration';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { PrismaAccountRegistration } from './infrastructure/persistence/prisma-account-registration';

@Module({
  imports: [
    DatabaseModule,
    DriversModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('auth.jwtSecret'),
        signOptions: {
          algorithm: 'HS256',
          expiresIn:
            config.getOrThrow<JwtSignOptions['expiresIn']>('auth.jwtExpiresIn'),
        },
        verifyOptions: { algorithms: ['HS256'] },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    { provide: AccountRegistration, useClass: PrismaAccountRegistration },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    { provide: PasswordHasher, useClass: Argon2PasswordHasher },
    { provide: AccessTokenService, useClass: JwtAccessTokenService },
  ],
})
export class IdentityModule {}
