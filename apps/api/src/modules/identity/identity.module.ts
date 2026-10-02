import { Global, Module } from '@nestjs/common';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { GetCurrentUserUseCase } from './application/use-cases/get-current-user.use-case';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';
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
import { LoginUseCase } from './application/use-cases/login.use-case';
import { PrismaAccountRegistration } from './infrastructure/persistence/prisma-account-registration';

@Global()
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
    AuthenticateUserUseCase,
    GetCurrentUserUseCase,
    JwtAuthGuard,
    RolesGuard,
    RegisterUserUseCase,
    LoginUseCase,
    { provide: AccountRegistration, useClass: PrismaAccountRegistration },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    { provide: PasswordHasher, useClass: Argon2PasswordHasher },
    { provide: AccessTokenService, useClass: JwtAccessTokenService },
  ],
  exports: [AuthenticateUserUseCase, JwtAuthGuard, RolesGuard],
})
export class IdentityModule {}
