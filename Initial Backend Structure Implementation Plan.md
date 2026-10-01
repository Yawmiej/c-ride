# C-Ride Backend — Initial Structure Plan

## Goal

Create the initial NestJS backend foundation only.

At this stage:

- scaffold the project
- install/configure dependencies
- establish the folder architecture
- configure environment handling
- configure Prisma, Redis, BullMQ, Firebase and telemetry modules at a foundational level
- create empty module/layer files where needed

Do **not** implement ride/authentication/notification business logic yet.

---

## Target structure

```text
src/
├── main.ts
├── app.module.ts
│
├── config/
│   ├── app.config.ts
│   ├── auth.config.ts
│   ├── database.config.ts
│   ├── redis.config.ts
│   ├── firebase.config.ts
│   ├── telemetry.config.ts
│   ├── env.validation.ts
│   └── config.module.ts
│
├── common/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   ├── exceptions/
│   ├── types/
│   └── constants/
│
├── infrastructure/
│   ├── database/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── cache/
│   │   ├── cache.module.ts
│   │   └── redis.service.ts
│   │
│   ├── queue/
│   │   └── queue.module.ts
│   │
│   ├── firebase/
│   │   ├── firebase.module.ts
│   │   └── firebase.service.ts
│   │
│   └── telemetry/
│       └── telemetry.module.ts
│
├── modules/
│   ├── identity/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── identity.module.ts
│   │
│   ├── rides/
│   │   ├── application/
│   │   │   ├── rider/
│   │   │   ├── driver/
│   │   │   └── shared/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   │   ├── http/
│   │   │   └── websocket/
│   │   └── rides.module.ts
│   │
│   └── notifications/
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── notifications.module.ts
│
└── shared/
    ├── utils/
    ├── types/
    └── constants/

prisma/
├── schema.prisma
├── migrations/
└── seed.ts

test/

.env.example
docker-compose.yml
nest-cli.json
package.json
tsconfig.json
tsconfig.build.json
README.md
AGENTS.md
```

---

## Domain choices

Only create domains required by the assessment:

### `identity`

Owns:

- users
- authentication
- authorization
- roles

Do not create separate top-level `riders` and `drivers` modules yet.

`RIDER` and `DRIVER` are actors/roles within the current scope.

### `rides`

Owns:

- ride requests
- ride lifecycle
- ride acceptance
- ride status
- ride history
- ride realtime communication

Actor-specific application operations can be separated under:

```text
application/
├── rider/
├── driver/
└── shared/
```

This gives us Rider/Driver separation without duplicating the Ride domain.

### `notifications`

Owns:

- notification orchestration
- background notification jobs
- push-notification abstraction

Firebase itself remains root infrastructure.

---

## `common` vs `shared`

Use them differently.

### `common/`

Nest/application-wide framework concerns:

```text
guards
decorators
filters
interceptors
exceptions
```

### `shared/`

Framework-independent reusable primitives:

```text
types
constants
small utilities
```

Do not turn either folder into a dumping ground.

---

## Infrastructure responsibilities

Root infrastructure contains technology integrations only.

```text
database    → Prisma
cache       → Redis
queue       → BullMQ
firebase    → Firebase Admin
telemetry   → OpenTelemetry
```

Domain-specific adapters should eventually live inside their owning module.

Example:

```text
modules/rides/infrastructure/
```

may later contain ride-specific Prisma repositories or Redis cache adapters.

Do not put ride-specific queries inside:

```text
infrastructure/database/
```

---

## Dependency choices

Use current stable versions where practical.

Core stack:

- Node.js — current supported LTS
- NestJS 12.x
- TypeScript
- Prisma 7.10.x
- PostgreSQL
- `argon2` for password hashing
- `@nestjs/jwt`
- `@nestjs/passport`
- Passport JWT
- Redis using `redis` / node-redis
- BullMQ + `@nestjs/bullmq`
- Socket.IO + NestJS WebSockets
- Firebase Admin SDK
- OpenTelemetry Node SDK
- `class-validator`
- `class-transformer`

NestJS 12.1.x is current, `@nestjs/bullmq` 12.0.0 supports BullMQ integration, BullMQ itself is currently 6.x, Firebase Admin is 14.5.x, and node-redis 6.x is the maintained Redis client. citeturn655076search2turn387306search0turn655076search3turn655076search7turn416623search1

---

## package.json

Create the project using the current Nest CLI, then normalize dependencies around the current stable major versions.

Use approximately:

```json
{
  "dependencies": {
    "@nestjs/bullmq": "^12.0.0",
    "@nestjs/common": "^12.1.2",
    "@nestjs/config": "^12.0.1",
    "@nestjs/core": "^12.1.2",
    "@nestjs/jwt": "^12.0.2",
    "@nestjs/passport": "^12.0.0",
    "@nestjs/platform-express": "^12.1.2",
    "@nestjs/platform-socket.io": "^12.1.2",
    "@nestjs/swagger": "^12.0.0",
    "@nestjs/websockets": "^12.1.0",
    "@opentelemetry/api": "latest",
    "@opentelemetry/auto-instrumentations-node": "latest",
    "@opentelemetry/sdk-node": "^0.222.0",
    "@prisma/client": "7.10.0",
    "argon2": "^0.45.1",
    "bullmq": "^6.3.11",
    "class-transformer": "latest",
    "class-validator": "latest",
    "firebase-admin": "^14.5.0",
    "passport": "latest",
    "passport-jwt": "latest",
    "redis": "^6.3.0",
    "reflect-metadata": "latest",
    "rxjs": "latest",
    "socket.io": "latest"
  },
  "devDependencies": {
    "@nestjs/cli": "^12.0.0",
    "@nestjs/schematics": "^12.0.0",
    "@nestjs/testing": "^12.1.2",
    "@types/node": "latest",
    "@types/passport-jwt": "latest",
    "prisma": "7.10.0",
    "typescript": "latest"
  }
}
```

Codex should preserve the scripts generated by Nest CLI and add Prisma-related scripts later if useful.

Do not use Prisma 8 RC for this assessment.

---

## Configuration

Create configuration namespaces for:

```text
app
auth
database
redis
firebase
telemetry
```

Environment variables expected initially:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=

JWT_SECRET=
JWT_EXPIRES_IN=1h

REDIS_URL=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

OTEL_SERVICE_NAME=c-ride-api
OTEL_EXPORTER_OTLP_ENDPOINT=
```

Validate required variables during application startup.

Application modules should consume Nest's configuration abstraction rather than accessing `process.env` throughout the codebase.

---

## Prisma

At this stage only:

1. initialize Prisma
2. configure PostgreSQL
3. create `PrismaModule`
4. create `PrismaService`
5. create the empty/initial schema location

Do not design the full database schema in this scaffolding task yet.

---

## Docker

Create `docker-compose.yml` containing:

```text
PostgreSQL
Redis
```

No Kubernetes or additional infrastructure.

---

## Completion criteria

This scaffolding task is complete when:

- Nest application boots
- folder structure exists
- modules compile
- environment validation works
- Prisma is initialized
- PostgreSQL configuration exists
- Redis connection infrastructure exists
- BullMQ root configuration exists
- Firebase infrastructure can be configured from environment
- telemetry bootstrap structure exists
- `.env.example` exists
- Docker Compose provides PostgreSQL and Redis
- lint succeeds
- TypeScript compilation succeeds

Do not implement:

- registration/login
- JWT guards
- ride endpoints
- Prisma entities
- ride state machine
- Bull jobs
- Firebase notification behavior
- WebSocket events
- repositories
- application use cases
- tests for business behavior

Those belong to subsequent implementation phases.