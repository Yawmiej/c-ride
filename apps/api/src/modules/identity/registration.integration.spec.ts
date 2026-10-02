import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { config } from 'dotenv';
import { createValidationPipe } from '../../common/validation/create-validation-pipe';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { PrismaDriverRegistration } from '../drivers/infrastructure/persistence/prisma-driver-registration';
import { AccessTokenService } from './application/contracts/access-token.service';
import { PasswordHasher } from './application/contracts/password-hasher';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { UserRole } from './domain/enums/user-role.enum';
import { UserRepository } from './domain/repositories/user.repository';
import { IdentityModule } from './identity.module';

// Opt in: this suite creates and removes only its uniquely named test accounts.
const databaseTests =
  process.env.RUN_DATABASE_TESTS === '1' ? describe : describe.skip;

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
        expect(user.driverProfile).toMatchObject({
          status: 'PENDING_ONBOARDING',
          isAvailable: false,
          vehicle: null,
        });
      } else {
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
    const drivers = app.get(PrismaDriverRegistration);
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
});
