import {
  Body,
  CanActivate,
  Controller,
  ExecutionContext,
  Get,
  INestApplication,
  Injectable,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, IsUUID, Min } from 'class-validator';
import { configureApplication } from './app-setup';
import { ApplicationError } from './shared/errors/application-error';
import { ERROR_KINDS } from './shared/errors/error-kinds';
import { ERROR_MESSAGES } from './shared/errors/error-messages';
import { IdentityModule } from './modules/identity/identity.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { AccessTokenService } from './modules/identity/application/contracts/access-token.service';
import { UserRole } from './modules/identity/domain/enums/user-role.enum';

class BodyDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}

class PaginationDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value,
  )
  @IsInt()
  @Min(1)
  page!: number;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value,
  )
  @IsInt()
  @Min(1)
  limit!: number;
}

@Injectable()
class BearerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return (
      context
        .switchToHttp()
        .getRequest<{ headers: { authorization?: string } }>().headers
        .authorization === 'Bearer test-token'
    );
  }
}

@Controller('testing')
@ApiTags('testing')
class TestController {
  bodyCalls = 0;
  queryCalls = 0;

  @Post('body')
  @ApiBody({ type: BodyDto })
  body(@Body() body: BodyDto) {
    this.bodyCalls += 1;
    return body;
  }

  @Get('page')
  page(@Query() query: PaginationDto) {
    this.queryCalls += 1;
    return query;
  }

  @Get('protected')
  @UseGuards(BearerGuard)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ description: 'Authenticated test route' })
  protected() {
    return { ok: true };
  }

  @Get('error/:kind')
  error(@Param('kind') kind: string) {
    switch (kind) {
      case ERROR_KINDS.AUTHENTICATION:
        throw new ApplicationError(
          ERROR_KINDS.AUTHENTICATION,
          ERROR_MESSAGES.INVALID_AUTHENTICATION,
        );
      case ERROR_KINDS.FORBIDDEN:
        throw new ApplicationError(
          ERROR_KINDS.FORBIDDEN,
          ERROR_MESSAGES.OPERATION_FORBIDDEN,
        );
      case 'missing':
        throw new ApplicationError(
          ERROR_KINDS.NOT_FOUND,
          ERROR_MESSAGES.NOT_FOUND('Resource'),
        );
      case ERROR_KINDS.CONFLICT:
        throw new ApplicationError(
          ERROR_KINDS.CONFLICT,
          ERROR_MESSAGES.ALREADY_EXISTS('Resource'),
        );
      default:
        throw new Error('database password=do-not-leak');
    }
  }
}

describe('API setup', () => {
  let app: INestApplication;
  let controller: TestController;
  let baseUrl: string;
  const identity = {
    id: 'ecaf19b2-0c57-46a3-9d04-8d7f350796cb',
    email: 'ada@example.com',
    passwordHash: 'not-returned',
    firstName: 'Ada',
    lastName: 'Lovelace',
    phoneNumber: null,
    role: 'RIDER',
    status: 'ACTIVE',
    createdAt: new Date('2026-10-02T12:00:00.000Z'),
    updatedAt: new Date('2026-10-02T12:00:00.000Z'),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [TestController],
      providers: [BearerGuard],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: true,
          ignoreEnvVars: true,
          load: [
            () => ({
              auth: { jwtSecret: 'api-setup-test-secret', jwtExpiresIn: '1h' },
            }),
          ],
        }),
        IdentityModule,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: { findUnique: async () => identity },
      })
      .compile();
    app = module.createNestApplication({ logger: false });
    configureApplication(app);
    await app.listen(0, '127.0.0.1');
    baseUrl = await app.getUrl();
    controller = app.get(TestController);
  });

  afterAll(async () => {
    await app?.close();
  });

  it('rejects malformed input before a controller invokes its use case', async () => {
    const response = await fetch(`${baseUrl}/api/v1/testing/body`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: 'not-a-uuid', name: 'Ada', unexpected: true }),
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      statusCode: 400,
      code: 'VALIDATION_FAILED',
      path: '/api/v1/testing/body',
    });
    expect(controller.bodyCalls).toBe(0);
  });

  it('allows only explicit integer pagination transforms', async () => {
    const valid = await fetch(`${baseUrl}/api/v1/testing/page?page=2&limit=20`);
    expect(valid.status).toBe(200);
    expect(await valid.json()).toEqual({ page: 2, limit: 20 });

    for (const query of [
      'page=true&limit=20',
      'page=1.5&limit=20',
      'page=0&limit=20',
    ]) {
      const response = await fetch(`${baseUrl}/api/v1/testing/page?${query}`);
      expect(response.status).toBe(400);
    }
    expect(controller.queryCalls).toBe(1);
  });

  it.each([
    [ERROR_KINDS.AUTHENTICATION, 401, 'UNAUTHORIZED'],
    [ERROR_KINDS.FORBIDDEN, 403, 'FORBIDDEN'],
    ['missing', 404, 'NOT_FOUND'],
    [ERROR_KINDS.CONFLICT, 409, 'CONFLICT'],
    ['unexpected', 500, 'INTERNAL_ERROR'],
  ])(
    'maps %s errors to the stable public boundary',
    async (kind, status, code) => {
      const response = await fetch(`${baseUrl}/api/v1/testing/error/${kind}`);
      expect(response.status).toBe(status);
      const body = (await response.json()) as Record<string, unknown>;
      expect(body).toMatchObject({
        statusCode: status,
        code,
        path: `/api/v1/testing/error/${kind}`,
      });
      expect(JSON.stringify(body)).not.toContain('database password');
      expect(JSON.stringify(body)).not.toContain('stack');
    },
  );

  it('serves prefixed Swagger documentation and protects the documented route', async () => {
    const documentation = await fetch(`${baseUrl}/api/v1/docs-json`);
    expect(documentation.status).toBe(200);
    const document = (await documentation.json()) as {
      paths: Record<string, { get?: { security?: unknown[] } }>;
    };
    expect(document.paths['/api/v1/testing/protected']?.get?.security).toEqual([
      { 'access-token': [] },
    ]);
    expect(document.paths['/api/v1/auth/me']?.get?.security).toEqual([
      { 'access-token': [] },
    ]);

    expect((await fetch(`${baseUrl}/api/v1/testing/protected`)).status).toBe(
      403,
    );
    const response = await fetch(`${baseUrl}/api/v1/testing/protected`, {
      headers: { authorization: 'Bearer test-token' },
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });

    const token = await app.get(AccessTokenService).issue({
      sub: identity.id,
      role: UserRole.RIDER,
    });
    const me = await fetch(`${baseUrl}/api/v1/auth/me`, {
      headers: { authorization: `Bearer ${token}` },
    });
    expect(me.status).toBe(200);
    expect(await me.json()).toMatchObject({
      id: identity.id,
      email: identity.email,
    });
  });
});
