# C-Ride Frontend Agent Context

## Project and Scope

C-Ride is one React + Vite application serving Rider and Driver experiences. Keep implementation scoped to the requested phase and consistent with the existing code and visual design.

Primary stack: React, strict TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod, Socket.IO Client, and Lucide React.

## Architecture and Dependency Direction

```text
app/pages -> features -> entities -> shared
```

Lower layers must not depend on higher layers. Avoid circular dependencies and prefer absolute imports.

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   ├── layouts/
│   └── styles/
├── pages/
│   ├── auth/
│   ├── rider/
│   └── driver/
├── features/
│   ├── authentication/
│   ├── ride-request/
│   ├── ride-acceptance/
│   ├── ride-tracking/
│   └── ride-lifecycle/
├── entities/
│   ├── ride/
│   ├── user/
│   └── driver/
├── shared/
│   ├── api/
│   ├── realtime/
│   ├── components/
│   ├── config/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── main.tsx
└── vite-env.d.ts
```

- `app`: router, providers, layouts, global styles, and application composition.
- `pages`: thin routed screens composing features and entities. Persona-specific routes belong here.
- `features`: user actions/business capabilities, with components, hooks, queries, schemas, and types colocated as needed. Do not create `features/rider` or `features/driver`.
- `entities`: reusable business concepts, domain types, state, and shared entity queries.
- `shared`: generic infrastructure and reusable primitives; no business-specific logic.
- Add new capabilities under descriptive feature names, such as `driver-onboarding`, rather than grouping the whole application by persona.
- Do not create parallel root-level `components`, `hooks`, `lib`, or `types` folders for code owned by these layers.
- Move code into Turborepo packages only when it has genuine cross-application reuse.

## Components and UI Primitives

- Build small, focused components with one responsibility. Split large screens into meaningful pieces; avoid putting an entire screen into one 300-line component.
- Keep feature-specific components in their feature, entity-specific components with their entity, and generic reused components in `shared/components`.
- Prefer composition over components with many configuration props. Avoid duplicated markup.
- Before creating UI, check existing components, then shadcn/ui, then composition/extension of a shared component.
- Use shadcn Button, Input, Select, Card, Badge, Dialog, Tabs, Avatar, Form, Alert, Skeleton, and Separator where applicable.
- Install missing primitives with the shadcn CLI, using the project's package-manager convention and configured aliases. Do not manually recreate shadcn components.
- Reserve `shared/components/ui` for shadcn primitives; ensure CLI aliases match this placement when initializing shadcn.
- Wrap primitives only for meaningful reusable product behavior. A `RideStatusBadge` or `VehicleSelector` is appropriate; a redundant Button wrapper is not.
- Use Lucide React icons consistently.

## Styling and Design

- Use Tailwind CSS and preserve the generated C-Ride design as the visual reference.
- Maintain consistent typography, spacing, radii, colors, cards, form controls, status indicators, and buttons.
- Define reusable brand/theme values centrally; use semantic classes such as `bg-primary text-primary-foreground`, `bg-muted text-muted-foreground`, `border-border`, and `bg-card text-card-foreground`.
- Do not scatter hardcoded hex colors or one-off styling through screens; avoid inline styles.
- Prefer Tailwind scale values such as `w-10`, `h-10`, `p-4`, `gap-6`, `rounded-lg`, and `max-w-md`.
- Use arbitrary values only when the design requires a value not reasonably represented by the scale. Do not mechanically translate every Figma pixel value.
- Reproduce the supplied design through the existing design system rather than inventing a new visual language.

## Server State and API

- Use TanStack Query for API/server state; do not fetch server data manually in `useEffect`.
- Colocate capability-specific queries/mutations with the feature, for example `features/ride-tracking/queries`; place reusable ride queries/types under `entities/ride`.
- Reuse query keys/options such as `rideKeys.detail(rideId)`, `rideKeys.history()`, and `rideKeys.available()`.
- Mutations must invalidate or update the relevant query cache. Do not duplicate fetching logic across components.
- Keep generic HTTP configuration in `shared/api`: base URL, authentication headers, response parsing, and common error handling.
- Keep endpoint-specific business operations with their entity/feature; components should not repeat raw fetch configuration.
- Compose the QueryClient/provider at the application layer.

## Realtime

- Keep generic Socket.IO initialization, transport, and lifecycle in `shared/realtime`.
- Put ride-specific subscriptions and behavior in the relevant entity or feature, for example `features/ride-tracking/hooks/use-ride-socket.ts`.
- Treat backend data as authoritative and use REST/TanStack Query for server-state retrieval.
- Apply socket events to the relevant query cache or invalidate it; do not create an independent competing state store.

## Forms and Local State

- Use React Hook Form, Zod, and shadcn Form components.
- Keep schemas outside large JSX components and colocate them with the capability, such as `features/driver-onboarding/schemas`.
- Avoid extensive manual validation in submit handlers.
- Use TanStack Query for server state, React Hook Form for form state, and `useState`/`useReducer` for local UI state.
- Keep state close to its consumers. Add global state libraries only for a demonstrated need.

## Rider and Driver Experiences

- Rider and Driver may have different routes, layouts, navigation, and feature components, but share authentication, API/query infrastructure, design primitives, and common capabilities.
- Target authentication screens include login and rider/driver account signup.
- Rider screens include requesting a ride and tracking an active ride.
- Driver screens include vehicle onboarding, available rides, and an active ride.
- Driver signup may present account and vehicle steps as one UI journey, but respect backend operations: registration creates a pending driver and vehicle onboarding activates the profile separately.
- Vehicle onboarding includes selection among three vehicle images, make/model details, plate number, and color. Use a reusable `VehicleSelector` rather than three duplicated cards.

## TypeScript and Naming

- Keep strict TypeScript enabled and avoid `any` unless an exceptional reason is documented.
- Reuse explicit domain types such as Ride, RideStatus, User, UserRole, Vehicle, and DriverLocation rather than duplicating API/domain definitions.
- Use PascalCase components, `useSomething` hooks, camelCase functions, UPPER_SNAKE_CASE constants, and kebab-case folders/files.
- Examples: `vehicle-selector.tsx`, `ride-status-badge.tsx`, `use-ride-socket.ts`, `ride.queries.ts`, and `ride.mutations.ts`.
- Prefer readable, explicit code; avoid premature abstractions and unnecessary dependencies.

## Required End-of-Cycle Review

- Review every module, component, class, hook, and function added or changed, plus affected callers/dependencies, after each implementation cycle.
- Check layer placement, import direction, route composition, state ownership, query invalidation, socket cleanup, form validation, shared-component reuse, and API contract consistency.
- Verify design fidelity, responsive layout, and relevant loading/error/empty states.
- Run relevant formatting, lint, type/build checks, and focused behavioral tests; distinguish passed checks from verification blocked by unavailable services.
- Update implementation tasks only on verified completion and preserve unrelated work.
