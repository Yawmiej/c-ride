# C-Ride Backend Agent Context

## Project

C-Ride is a NestJS ride-hailing backend built with:

- NestJS
- TypeScript
- PostgreSQL + Prisma
- Redis
- BullMQ
- Socket.IO
- Firebase Admin
- OpenTelemetry
- Argon2id for password hashing

Use current stable package versions where practical. Avoid prerelease packages unless explicitly requested.

## Architecture

Use a **modular monolith organized by business domain**.

Current modules:

```text
identity/
rides/
notifications/
```

RIDER and DRIVER are actors/roles, not separate top-level copies of the application.

For example, Rider and Driver ride operations belong to the same `rides` domain:

```text
rides/
├── application/
│   ├── rider/
│   ├── driver/
│   └── shared/
├── domain/
├── infrastructure/
└── presentation/
```

## Root structure

```text
src/
├── config/
├── common/
├── infrastructure/
├── modules/
└── shared/
```

Root `infrastructure/` must follow:

```text
infrastructure/
├── database/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── cache/
│   ├── cache.module.ts
│   └── redis.service.ts
├── queue/
│   └── queue.module.ts
├── firebase/
│   ├── firebase.module.ts
│   └── firebase.service.ts
└── telemetry/
    └── telemetry.module.ts
```

Root infrastructure is **technology-specific but business-agnostic**.

Example:

Good:

```text
RedisService.get(key)
RedisService.set(key)
```

Avoid:

```text
RedisService.getRide(id)
```

Ride-specific infrastructure belongs inside the Ride module.

## Layer responsibilities

Keep boundaries simple:

```text
presentation → application → domain
                    ↓
              infrastructure
```

- `domain` — business rules and models
- `application` — use cases
- `presentation` — controllers, DTOs and WebSocket gateways
- module `infrastructure` — Prisma/Redis/etc. adapters specific to that domain
- root `infrastructure` — shared technology clients

Do not introduce abstractions without a clear reason.

Avoid generic `BaseRepository<T>` patterns.

Prefer domain-oriented operations when repositories are introduced later.

## Important implementation principles

Keep controllers thin.

Do not put business rules directly in controllers, gateways, Prisma services or Firebase services.

PostgreSQL is the durable source of truth.

Redis is cache/temporary infrastructure.

WebSockets communicate realtime changes but are not the source of truth.

Firebase-specific logic must remain separate from ride business logic.

Use BullMQ for asynchronous notifications.

Use Argon2id through the `argon2` package for password hashing.

Configuration must come through the configuration layer rather than scattered `process.env` access.

Do not introduce:

- microservices
- Kafka
- Kubernetes
- event sourcing
- CQRS infrastructure
- speculative domains such as payments or pricing

unless explicitly requested.

## Current task constraint

For the initial scaffolding phase, **do not implement business logic**.

Only create:

- project structure
- module skeletons
- infrastructure skeletons
- configuration
- package dependencies
- Prisma initialization
- Docker Compose
- environment files

Do not implement authentication, rides, WebSocket behavior, jobs or notifications until a later task.