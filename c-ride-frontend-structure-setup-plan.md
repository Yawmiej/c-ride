# C-Ride Frontend Structure & Setup Plan

## Objective

Set up a production-grade React + Vite frontend inside a Turborepo with clear architectural boundaries for both Rider and Driver experiences.

This plan covers only:

- project and folder structure
- frontend setup
- configuration
- architecture boundaries
- repository conventions

It does **not** cover feature implementation.

---

## 1. Create the Frontend App in Turborepo

Create the frontend application under:

```text
apps/web
```

Use:

- React
- Vite
- TypeScript

Ensure the app participates in the existing Turborepo workspace and uses shared workspace configuration where appropriate.

Recommended root shape:

```text
c-ride/
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/                  # only if genuinely shared across apps
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

Avoid moving frontend-specific domain code into workspace packages prematurely.

---

## 2. Establish the Source Structure

Create:

```text
apps/web/src/
├── app/
├── pages/
├── features/
├── entities/
├── shared/
├── main.tsx
└── vite-env.d.ts
```

The intended dependency direction is:

```text
app/pages
   ↓
features
   ↓
entities
   ↓
shared
```

Lower layers must not depend on higher layers.

---

## 3. Configure Application-Level Structure

Create:

```text
src/app/
├── router/
├── providers/
├── layouts/
└── styles/
```

Responsibilities:

- `router/` — application routing configuration
- `providers/` — top-level providers
- `layouts/` — Rider, Driver, Auth, and Root layouts
- `styles/` — global styles and application-level styling setup

Keep business/domain logic out of this layer.

---

## 4. Create Persona-Oriented Page Areas

Create:

```text
src/pages/
├── auth/
├── rider/
└── driver/
```

Rider and Driver are application personas and route areas.

They should **not** become top-level feature groupings such as:

```text
features/rider
features/driver
```

Pages should remain primarily compositional.

---

## 5. Create Feature-Oriented Boundaries

Create initial feature folders that reflect business capabilities rather than personas.

Suggested starting structure:

```text
src/features/
├── authentication/
├── ride-request/
├── ride-acceptance/
├── ride-tracking/
└── ride-lifecycle/
```

Only create subfolders when there is code that belongs there.

Possible internal structure for a feature:

```text
feature-name/
├── api/
├── components/
├── hooks/
├── model/
├── schemas/
└── index.ts
```

---

## 6. Create Entity Boundaries

Create:

```text
src/entities/
├── ride/
├── user/
└── driver/
```

Entities represent reusable business concepts and domain/server state.

Possible internal structure:

```text
entity-name/
├── api/
├── queries/
├── model/
├── realtime/
├── components/
└── index.ts
```

Keep entity code independent of higher-level feature and page code.

---

## 7. Create Shared Infrastructure Areas

Create:

```text
src/shared/
├── api/
├── realtime/
├── components/
├── config/
├── hooks/
├── lib/
└── types/
```

Guidelines:

- `shared/api` — generic HTTP client and transport concerns
- `shared/realtime` — generic Socket.IO connection infrastructure
- `shared/components` — reusable UI primitives
- `shared/config` — environment and application configuration
- `shared/hooks` — truly generic hooks
- `shared/lib` — generic utilities
- `shared/types` — generic cross-cutting types

The shared layer must not contain domain-specific business logic.

---

## 8. Configure Import Aliases

Configure aliases for:

```text
@/app/*
@/pages/*
@/features/*
@/entities/*
@/shared/*
```

Ensure they work consistently across:

- TypeScript
- Vite
- ESLint/import resolution
- tests

Prefer absolute imports over deep relative paths.

---

## 9. Configure Core Frontend Dependencies

Install and configure the architectural foundations:

- React Router
- TanStack Query
- Socket.IO Client
- React Hook Form
- Zod
- Tailwind CSS
- Vitest
- React Testing Library

This phase should only establish framework and infrastructure configuration, not implement product features.

---

## 10. Configure Routing Foundation

Set up React Router with route groups for:

```text
/login
/register

/rider/*
/driver/*
```

Prepare dedicated layouts for:

```text
RootLayout
AuthLayout
RiderLayout
DriverLayout
```

Routing structure should reflect the two product experiences without splitting them into separate applications.

---

## 11. Configure TanStack Query

Create a single application-level Query Client and provider.

Place Query Client configuration under:

```text
src/app/providers/
```

Establish conventions for:

- centralized entity query keys
- server state living in TanStack Query
- mutations invalidating/updating relevant cached queries

Do not introduce another global server-state store.

---

## 12. Configure API Infrastructure

Create the generic HTTP layer under:

```text
src/shared/api/
```

The shared API layer should own:

- base URL configuration
- generic headers
- authentication transport
- response handling
- normalized errors

Endpoint-specific code should remain within the owning feature or entity.

---

## 13. Configure Realtime Infrastructure

Create generic Socket.IO infrastructure under:

```text
src/shared/realtime/
```

This layer should only handle transport-level concerns such as:

- connect
- disconnect
- authenticate
- reconnect
- subscribe
- unsubscribe
- emit

Domain-specific events should live closer to the relevant entity or feature.

---

## 14. Configure Environment Handling

Define and validate frontend environment variables.

At minimum, prepare configuration for:

```text
VITE_API_BASE_URL
VITE_SOCKET_URL
```

Expose environment access through:

```text
src/shared/config/
```

Avoid reading `import.meta.env` throughout the application directly.

---

## 15. Configure Styling

Set up Tailwind CSS.

Define:

- global styles
- design tokens where needed
- reusable UI primitives
- responsive defaults

Keep generic UI primitives in `shared/components` or a Turborepo `packages/ui` package only when there is a genuine cross-application consumer.

---

## 16. Configure Testing

Set up:

- Vitest
- React Testing Library
- test environment/configuration
- shared test setup utilities where necessary

Ensure aliases work in test files as well.

No feature tests are required during this setup phase.

---

## 17. Add Dependency Boundary Enforcement

Where practical, add lint rules or import restrictions that prevent invalid dependencies.

Enforce the intent that:

```text
shared    ✕ imports from entities/features/pages
entities  ✕ imports from features/pages
features  ✕ imports from pages
```

Avoid circular dependencies.

---

## 18. Define Turborepo Package Policy

Keep frontend application code in:

```text
apps/web
```

Only extract code into `/packages` when:

- there are multiple genuine consumers, or
- the package represents a clearly independent cross-application concern

Good package candidates:

- shared UI/design system
- ESLint config
- TypeScript config
- reusable SDKs

Avoid premature packages such as:

```text
packages/rider
packages/driver
packages/ride
packages/auth
```

when `apps/web` is the only consumer.

---

## 19. Add `AGENTS.md`

Create:

```text
apps/web/AGENTS.md
```

It should remain concise and declarative.

It should document:

- architectural layers
- dependency direction
- Rider/Driver treatment
- folder responsibilities
- TanStack Query usage
- realtime placement
- package extraction policy
- TypeScript/import conventions

Avoid implementation walkthroughs and excessive procedural detail.

---

## Completion Criteria

The frontend structure/setup phase is complete when:

- `apps/web` runs successfully inside Turborepo
- the target folder structure exists
- routing foundation is configured
- TanStack Query is configured
- API infrastructure is established
- Socket.IO infrastructure is established
- environment configuration is centralized
- Tailwind is configured
- testing infrastructure is configured
- aliases work across app and tests
- architecture boundaries are documented
- `AGENTS.md` exists
- no feature/business implementation has been added yet
