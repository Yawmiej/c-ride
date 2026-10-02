import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { AccessTokenService } from './application/contracts/access-token.service';
import { PasswordHasher } from './application/contracts/password-hasher';
import { UserRole } from './domain/enums/user-role.enum';
import { UserRepository } from './domain/repositories/user.repository';
import { IdentityModule } from './identity.module';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { GetCurrentUserUseCase } from './application/use-cases/get-current-user.use-case';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { GetDriverProfileUseCase } from '../drivers/application/use-cases/get-driver-profile.use-case';
import { DriverProfileRepository } from '../drivers/domain/repositories/driver-profile.repository';
import { PrismaDriverProfileRepository } from '../drivers/infrastructure/persistence/prisma-driver-profile.repository';
import { VehicleRepository } from '../drivers/domain/repositories/vehicle.repository';
import { PrismaVehicleRepository } from '../drivers/infrastructure/persistence/prisma-vehicle.repository';
import { DriversController } from '../drivers/presentation/controllers/drivers.controller';
import { OnboardDriverUseCase } from '../drivers/application/use-cases/onboard-driver.use-case';

describe('IdentityModule', () => {
  let module: TestingModule;
  let tokens: AccessTokenService;
  let jwt: JwtService;
  const claims = { sub: 'user-id', role: UserRole.RIDER };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [
            () => ({
              auth: { jwtSecret: 'identity-test-secret', jwtExpiresIn: '1h' },
            }),
          ],
        }),
        IdentityModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();
    await module.init();
    tokens = module.get(AccessTokenService);
    jwt = module.get(JwtService);
  });

  afterAll(async () => {
    await module?.close();
  });

  it('resolves the controller and repository without connecting to a database', () => {
    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
    expect(module.get(UserRepository)).toBeInstanceOf(PrismaUserRepository);
    expect(module.get(DriverProfileRepository)).toBeInstanceOf(
      PrismaDriverProfileRepository,
    );
    expect(module.get(VehicleRepository)).toBeInstanceOf(
      PrismaVehicleRepository,
    );
    expect(module.get(DriversController)).toBeInstanceOf(DriversController);
    expect(module.get(RegisterUserUseCase)).toBeInstanceOf(RegisterUserUseCase);
    expect(module.get(LoginUseCase)).toBeInstanceOf(LoginUseCase);
    expect(module.get(GetCurrentUserUseCase)).toBeInstanceOf(
      GetCurrentUserUseCase,
    );
    expect(module.get(AuthenticateUserUseCase)).toBeInstanceOf(
      AuthenticateUserUseCase,
    );
    expect(module.get(GetDriverProfileUseCase)).toBeInstanceOf(
      GetDriverProfileUseCase,
    );
    expect(module.get(OnboardDriverUseCase)).toBeInstanceOf(
      OnboardDriverUseCase,
    );
  });

  it('hashes with Argon2id and verifies passwords through the abstract provider', async () => {
    const hasher = module.get(PasswordHasher);
    const hash = await hasher.hash('correct-password');
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await hasher.verify(hash, 'correct-password')).toBe(true);
    expect(await hasher.verify(hash, 'wrong-password')).toBe(false);
  });

  it('issues and verifies claims using configured expiry', async () => {
    const token = await tokens.issue(claims);
    expect(await tokens.verify(token)).toEqual(claims);
    const payload = jwt.decode<{ iat: number; exp: number }>(token);
    expect(payload.exp - payload.iat).toBe(3600);
  });

  it('rejects invalid signatures, expired tokens, and malformed tokens', async () => {
    const invalid = await jwt.signAsync(claims, { secret: 'different-secret' });
    const expired = await jwt.signAsync(claims, { expiresIn: -1 });
    for (const token of [invalid, expired, 'not-a-token', '']) {
      expect(await tokens.verify(token)).toBeNull();
    }
  });

  it('rejects unsupported algorithms and invalid or missing claims', async () => {
    const unsupported = await jwt.signAsync(claims, { algorithm: 'HS384' });
    expect(await tokens.verify(unsupported)).toBeNull();
    for (const payload of [
      { role: UserRole.RIDER },
      { sub: '', role: UserRole.RIDER },
      { sub: 'user-id', role: 'ADMIN' },
      { sub: 'user-id' },
    ]) {
      expect(await tokens.verify(await jwt.signAsync(payload))).toBeNull();
    }
    const noExpiry = new JwtService({ secret: 'identity-test-secret' });
    expect(await tokens.verify(await noExpiry.signAsync(claims))).toBeNull();
  });
});
