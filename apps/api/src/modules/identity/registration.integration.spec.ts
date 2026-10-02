import { Controller, Get, INestApplication, UseGuards } from '@nestjs/common';
import { CurrentUser } from './presentation/decorators/current-user.decorator';
import { Roles } from './presentation/decorators/roles.decorator';
import { JwtAuthGuard } from './presentation/guards/jwt-auth.guard';
import { RolesGuard } from './presentation/guards/roles.guard';
import { AuthenticatedUser } from './application/types/authenticated-user';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';
import { createValidationPipe } from '../../common/validation/create-validation-pipe';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PrismaDriverCreation } from '../drivers/infrastructure/persistence/prisma-driver-creation';
import { AccessTokenService } from './application/contracts/access-token.service';
import { PasswordHasher } from './application/contracts/password-hasher';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { UserRole } from './domain/enums/user-role.enum';
import { UserRepository } from './domain/repositories/user.repository';
import { IdentityModule } from './identity.module';
import { DriverProfileRepository } from '../drivers/domain/repositories/driver-profile.repository';

// Opt in: this suite creates and removes only its uniquely named test accounts.
const databaseTests =
  process.env.RUN_DATABASE_TESTS === '1' ? describe : describe.skip;

@Controller('role-tests')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DRIVER)
class RoleTestController {
  @Get('driver')
  driver(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Get('rider')
  @Roles(UserRole.RIDER)
  rider(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Get('either')
  @Roles(UserRole.RIDER, UserRole.DRIVER)
  either(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }

  @Get('override')
  @Roles()
  override(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}

@Controller('unrestricted-role-tests')
@UseGuards(JwtAuthGuard, RolesGuard)
class NoRoleTestController {
  @Get()
  current(@CurrentUser() user: AuthenticatedUser) {
    return user;
  }
}

databaseTests('Registration and login with PostgreSQL', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let baseUrl: string;
  const prefix = `registration-test-${randomUUID()}`;
  const emails: string[] = [];
  const command = (role = UserRole.RIDER) => {
    const email = `${prefix}-${emails.length}@example.com`;
    emails.push(email);
    return {
      firstName: 'Test',
      lastName: 'User',
      email,
      password: 'Password123!',
      role,
    };
  };
  const post = (body: unknown, route = 'register') =>
    fetch(`${baseUrl}/auth/${route}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });

  beforeAll(async () => {
    config({ quiet: true });
    const module = await Test.createTestingModule({
      controllers: [RoleTestController, NoRoleTestController],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          load: [
            () => ({
              database: { url: process.env.DATABASE_URL },
              auth: {
                jwtSecret: 'registration-integration-secret',
                jwtExpiresIn: '1h',
              },
            }),
          ],
        }),
        IdentityModule,
      ],
    }).compile();
    app = module.createNestApplication({ logger: false });
    app.useGlobalPipes(createValidationPipe());
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    try {
      if (prisma)
        await prisma.user.deleteMany({ where: { email: { in: emails } } });
    } finally {
      await app?.close();
    }
  });

  it.each([UserRole.RIDER, UserRole.DRIVER])(
    'registers %s with safe data and a usable token',
    async (role) => {
      const input = command(role);
      const response = await post({
        ...input,
        email: ` ${input.email.toUpperCase()} `,
      });
      expect(response.status).toBe(201);
      const result = (await response.json()) as {
        accessToken: string;
        user: { id: string; email: string; status: string };
      };
      expect(result.user.email).toBe(input.email);
      expect(result.user.status).toBe('ACTIVE');
      expect(JSON.stringify(result)).not.toMatch(/password|props/);
      expect(
        await app.get(AccessTokenService).verify(result.accessToken),
      ).toEqual({ sub: result.user.id, role });
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: result.user.id },
        include: { driverProfile: { include: { vehicle: true } } },
      });
      expect(
        await app.get(PasswordHasher).verify(user.passwordHash, input.password),
      ).toBe(true);
      if (role === UserRole.DRIVER) {
        expect(result.user).toMatchObject({
          driverProfile: {
            status: 'PENDING_ONBOARDING',
            isAvailable: false,
            vehicle: null,
          },
        });
        expect(user.driverProfile).toMatchObject({
          status: 'PENDING_ONBOARDING',
          isAvailable: false,
          vehicle: null,
        });
      } else {
        expect(result.user).not.toHaveProperty('driverProfile');
        expect(user.driverProfile).toBeNull();
      }
    },
  );

  it('rejects duplicate normalized email and phone with 409', async () => {
    const input = command();
    const phone = `+1${Date.now()}`;
    expect((await post({ ...input, phoneNumber: phone })).status).toBe(201);
    expect(
      (await post({ ...input, email: input.email.toUpperCase() })).status,
    ).toBe(409);
    const response = await post({
      ...command(),
      phoneNumber: `${phone.slice(0, 3)} ${phone.slice(3)}`,
    });
    expect(response.status).toBe(409);
    expect(JSON.stringify(await response.json())).not.toMatch(
      /Prisma|passwordHash|INSERT/,
    );
  });

  it('maps a database uniqueness race to 409', async () => {
    const input = command();
    const users = app.get(UserRepository);
    const lookup = users.findByEmail.bind(users);
    // Force both requests past the advisory check to exercise the DB constraint.
    users.findByEmail = async () => null;
    try {
      const responses = await Promise.all([post(input), post(input)]);
      expect(responses.map((response) => response.status).sort()).toEqual([
        201, 409,
      ]);
      expect(await prisma.user.count({ where: { email: input.email } })).toBe(
        1,
      );
    } finally {
      users.findByEmail = lookup;
    }
  });

  it('rolls back the account when driver creation fails and issues no token', async () => {
    const input = command(UserRole.DRIVER);
    const drivers = app.get(PrismaDriverCreation);
    const tokens = app.get(AccessTokenService);
    const createEmpty = drivers.createEmpty.bind(drivers);
    const issue = tokens.issue.bind(tokens);
    let issued = false;
    drivers.createEmpty = async () => {
      throw new Error('Simulated profile failure');
    };
    tokens.issue = async (claims) => {
      issued = true;
      return issue(claims);
    };
    try {
      await expect(app.get(RegisterUserUseCase).execute(input)).rejects.toThrow(
        'Simulated profile failure',
      );
      expect(
        await prisma.user.findUnique({ where: { email: input.email } }),
      ).toBeNull();
      expect(issued).toBe(false);
    } finally {
      drivers.createEmpty = createEmpty;
      tokens.issue = issue;
    }
  });

  it('rejects injected identity/status fields before writing', async () => {
    const input = command();
    expect(
      (await post({ ...input, id: randomUUID(), status: 'DISABLED' })).status,
    ).toBe(400);
    expect(
      await prisma.user.findUnique({ where: { email: input.email } }),
    ).toBeNull();
  });

  it.each([UserRole.RIDER, UserRole.DRIVER])(
    'logs in %s with the stored role and safe user data',
    async (role) => {
      const input = { ...command(role), password: ' Password123! ' };
      expect((await post(input)).status).toBe(201);
      const response = await post(
        { email: ` ${input.email.toUpperCase()} `, password: input.password },
        'login',
      );
      expect(response.status).toBe(200);
      const result = (await response.json()) as {
        accessToken: string;
        user: { id: string; email: string; role: UserRole };
      };
      expect(result.user).toMatchObject({ email: input.email, role });
      expect(
        await app.get(AccessTokenService).verify(result.accessToken),
      ).toEqual({ sub: result.user.id, role });
      expect(JSON.stringify(result)).not.toMatch(/password|props/);
      expect(
        (
          await post(
            { email: input.email, password: input.password.trim() },
            'login',
          )
        ).status,
      ).toBe(401);
    },
  );

  it('returns the same 401 for unknown accounts and wrong passwords', async () => {
    const input = command();
    expect((await post(input)).status).toBe(201);
    const wrong = await post(
      { email: input.email, password: 'wrong' },
      'login',
    );
    const missing = await post(
      { email: command().email, password: 'wrong' },
      'login',
    );
    expect(wrong.status).toBe(401);
    expect(missing.status).toBe(401);
    expect(await wrong.json()).toEqual(await missing.json());
  });

  it.each(['SUSPENDED', 'DISABLED'] as const)(
    'rejects %s accounts without issuing a token',
    async (status) => {
      const input = command();
      expect((await post(input)).status).toBe(201);
      await prisma.user.update({
        where: { email: input.email },
        data: { status },
      });
      const tokens = app.get(AccessTokenService);
      const issue = tokens.issue.bind(tokens);
      let issued = false;
      tokens.issue = async (claims) => {
        issued = true;
        return issue(claims);
      };
      try {
        const response = await post(
          { email: input.email, password: input.password },
          'login',
        );
        expect(response.status).toBe(401);
        expect(await response.json()).toMatchObject({
          message: 'Invalid email or password',
        });
        expect(issued).toBe(false);
      } finally {
        tokens.issue = issue;
      }
    },
  );

  it.each([
    { email: 'invalid', password: 'password' },
    { email: 'user@example.com', password: '' },
    { email: 'user@example.com', password: 123 },
    { email: 'user@example.com' },
    { email: 'user@example.com', password: 'password', role: 'DRIVER' },
  ])('rejects invalid login input %j', async (input) => {
    const response = await post(input, 'login');
    expect(response.status).toBe(400);
  });

  const me = (authorization?: string) =>
    fetch(`${baseUrl}/auth/me`, {
      headers: authorization ? { authorization } : {},
    });

  it.each([UserRole.RIDER, UserRole.DRIVER])(
    'returns the current %s with only appropriate profile data',
    async (role) => {
      const response = await post(command(role));
      const registered = (await response.json()) as {
        accessToken: string;
        user: { id: string };
      };
      const current = await me(`Bearer ${registered.accessToken}`);
      expect(current.status).toBe(200);
      const body = (await current.json()) as Record<string, unknown>;
      expect(body.id).toBe(registered.user.id);
      expect(JSON.stringify(body)).not.toMatch(/password|props/);
      if (role === UserRole.DRIVER) {
        expect(body.driverProfile).toMatchObject({
          status: 'PENDING_ONBOARDING',
          isAvailable: false,
          vehicle: null,
        });
        const repository = app.get(DriverProfileRepository);
        const profile = await repository.findByUserId(registered.user.id);
        expect(profile).not.toBeNull();
        const vehicle = await prisma.vehicle.create({
          data: {
            driverProfileId: profile!.id,
            type: 'SEDAN',
            make: 'Toyota',
            model: 'Corolla',
            color: 'Silver',
            year: 2022,
            licensePlate: `TEST-${randomUUID()}`,
          },
        });
        const withVehicle = await repository.findById(profile!.id);
        expect(withVehicle?.vehicle?.toSafeObject()).toEqual(vehicle);
        const refreshed = await (
          await me(`Bearer ${registered.accessToken}`)
        ).json();
        expect(refreshed).toMatchObject({
          driverProfile: {
            id: profile!.id,
            userId: registered.user.id,
            createdAt: profile!.createdAt.toISOString(),
            vehicle: {
              id: vehicle.id,
              driverProfileId: profile!.id,
              type: 'SEDAN',
              make: 'Toyota',
              model: 'Corolla',
              color: 'Silver',
              year: 2022,
              licensePlate: vehicle.licensePlate,
              createdAt: vehicle.createdAt.toISOString(),
              updatedAt: vehicle.updatedAt.toISOString(),
            },
          },
        });
        expect(JSON.stringify(refreshed)).not.toMatch(/password|props/);
        await prisma.driverProfile.delete({
          where: { userId: registered.user.id },
        });
        expect(
          await (await me(`Bearer ${registered.accessToken}`)).json(),
        ).toMatchObject({ driverProfile: null });
        expect(await repository.findById(profile!.id)).toBeNull();
        expect(await repository.findByUserId(registered.user.id)).toBeNull();
      } else {
        expect(body).not.toHaveProperty('driverProfile');
      }
    },
  );

  it.each([UserRole.RIDER, UserRole.DRIVER])(
    'enforces role metadata and returns the current %s identity',
    async (role) => {
      const registered = (await (await post(command(role))).json()) as {
        accessToken: string;
        user: { id: string };
      };
      const headers = { authorization: `Bearer ${registered.accessToken}` };
      for (const [route, expected] of [
        ['role-tests/rider', role === UserRole.RIDER ? 200 : 403],
        ['role-tests/driver', role === UserRole.DRIVER ? 200 : 403],
        ['role-tests/either', 200],
        ['role-tests/override', 200],
        ['unrestricted-role-tests', 200],
      ] as const) {
        const response = await fetch(`${baseUrl}/${route}`, { headers });
        expect(response.status).toBe(expected);
        if (expected === 200)
          expect(await response.json()).toEqual({
            id: registered.user.id,
            role,
          });
      }
    },
  );

  it('authenticates before role authorization, even without role restrictions', async () => {
    for (const route of [
      'role-tests/rider',
      'role-tests/driver',
      'role-tests/override',
      'unrestricted-role-tests',
    ]) {
      expect((await fetch(`${baseUrl}/${route}`)).status).toBe(401);
      expect(
        (
          await fetch(`${baseUrl}/${route}`, {
            headers: { authorization: 'Bearer invalid' },
          })
        ).status,
      ).toBe(401);
    }
  });

  it('rejects missing, malformed, expired, invalid-signature and invalid-subject tokens', async () => {
    const jwt = app.get(JwtService);
    const claims = { sub: randomUUID(), role: UserRole.RIDER };
    const expired = await jwt.signAsync(claims, { expiresIn: -1 });
    const invalid = await jwt.signAsync(claims, { secret: 'wrong-secret' });
    const badSubject = await jwt.signAsync({ ...claims, sub: 'not-a-uuid' });
    for (const header of [
      undefined,
      'Basic token',
      'Bearer',
      'Bearer bad token',
      'Bearer invalid',
      `Bearer ${expired}`,
      `Bearer ${invalid}`,
      `Bearer ${badSubject}`,
    ]) {
      const response = await me(header);
      expect(response.status).toBe(401);
      expect(await response.json()).toMatchObject({
        message: 'Invalid authentication',
      });
    }
  });

  it.each(['SUSPENDED', 'DISABLED', 'DELETED'] as const)(
    'rejects an existing token after the account is %s',
    async (status) => {
      const input = command();
      const result = (await (await post(input)).json()) as {
        accessToken: string;
      };
      if (status === 'DELETED') {
        await prisma.user.delete({ where: { email: input.email } });
      } else {
        await prisma.user.update({
          where: { email: input.email },
          data: { status },
        });
      }
      expect((await me(`Bearer ${result.accessToken}`)).status).toBe(401);
    },
  );
});
