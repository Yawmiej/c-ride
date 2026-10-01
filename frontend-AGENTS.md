# C-Ride Web Architecture

## Scope

This is a single React + Vite application containing both Rider and Driver experiences.

Rider and Driver are represented at the routing/page level, not as top-level feature directories.

## Architecture

Use the following dependency direction:

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

## Source Structure

```text
src/
├── app/
├── pages/
├── features/
├── entities/
├── shared/
├── main.tsx
└── vite-env.d.ts
```

### `app`

Application setup and composition.

Use for:
- router configuration
- providers
- layouts
- global styles

### `pages`

Route-level screens.

Organize persona-specific routes here:

```text
pages/
├── auth/
├── rider/
└── driver/
```

Pages should primarily compose features and entities.

### `features`

User actions and business capabilities.

Examples:

```text
features/
├── authentication/
├── ride-request/
├── ride-acceptance/
├── ride-tracking/
└── ride-lifecycle/
```

Do not create `features/rider` or `features/driver`.

### `entities`

Reusable business concepts and their state.

Examples:

```text
entities/
├── ride/
├── user/
└── driver/
```

### `shared`

Generic infrastructure and reusable primitives.

Examples:

```text
shared/
├── api/
├── realtime/
├── components/
├── config/
├── hooks/
├── lib/
└── types/
```

`shared` must not contain business-specific logic.

## Conventions

- Use TanStack Query for server state.
- Keep generic Socket.IO transport in `shared/realtime`.
- Keep domain-specific realtime behavior near the relevant entity or feature.
- Keep route components compositional.
- Prefer absolute imports.
- Avoid circular dependencies.
- Do not introduce global state libraries without a demonstrated need.
- Do not move code into Turborepo packages unless it has genuine cross-application reuse.
- Prefer explicit code over premature abstractions.
- Keep strict TypeScript enabled.

## Placement Rule

When adding code, ask:

- App composition? → `app`
- Routed screen? → `pages`
- User action/business capability? → `features`
- Reusable business concept/state? → `entities`
- Generic infrastructure/primitive? → `shared`