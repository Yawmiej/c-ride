# AGENTS.md — C-Ride Frontend

## Project

C-Ride is a single React application serving both Rider and Driver experiences.

Primary stack:

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form + Zod
- Socket.IO Client
- Lucide React

Keep the implementation simple, production-oriented, strongly typed, and consistent with the existing architecture.

---

## Architecture

Use feature/domain-oriented organization.

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── layouts/
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── queries/
│   │   ├── schemas/
│   │   └── types/
│   │
│   ├── rider/
│   │   ├── request-ride/
│   │   └── active-ride/
│   │
│   └── driver/
│       ├── available-rides/
│       ├── active-ride/
│       └── registration/
│
├── components/
│   ├── ui/
│   ├── common/
│   └── layout/
│
├── lib/
│   ├── api/
│   ├── query-client.ts
│   ├── socket.ts
│   └── utils.ts
│
├── hooks/
├── types/
└── styles/
```

Keep route components thin. Business/feature implementation belongs in `features/`.

Do not organize the whole application around generic folders such as:

```text
components/
hooks/
services/
pages/
```

when the code belongs to a specific feature.

---

## Components

Prefer **small, focused components**.

A component should have one clear responsibility. Split large screens into meaningful pieces.

For example:

```text
DriverSignupPage
├── SignupProgress
├── DriverAccountForm
├── VehicleSelector
│   └── VehicleOption
├── VehicleDetailsForm
└── SignupActions
```

Do not put an entire screen into one 300-line component.

Keep feature-specific components inside their feature.

```text
features/driver/registration/components/
```

Only move components to `components/common/` when they are genuinely reused across features.

Prefer composition over large components with many configuration props.

---

## shadcn/ui First

Before creating any UI component, check whether shadcn/ui already provides it.

Prefer:

```tsx
<Button />
<Input />
<Select />
<Card />
<Badge />
<Dialog />
<Tabs />
<Avatar />
<Form />
<Alert />
<Skeleton />
<Separator />
```

over recreating equivalent components manually.

If a required shadcn component is not installed, add it using the shadcn CLI.

```bash
npx shadcn@latest add <component>
```

Do not manually recreate shadcn components.

Do not create wrappers around shadcn components unless the wrapper represents meaningful reusable product behavior.

For example:

```text
Button                    → use shadcn Button

RideStatusBadge           → custom component is reasonable

Input                     → use shadcn Input

VehicleSelector           → custom component is reasonable
```

`components/ui/` is reserved for shadcn primitives.

---

## Styling

Use Tailwind CSS.

Prefer semantic design-system tokens.

GOOD:

```tsx
className = 'bg-primary text-primary-foreground';
className = 'bg-muted text-muted-foreground';
className = 'border-border';
className = 'bg-card text-card-foreground';
```

AVOID:

```tsx
className = 'bg-[#FFCC76]';
className = 'text-[#172554]';
className = 'border-[#E5E7EB]';
```

If C-Ride needs a brand color, define it once as a CSS/Tailwind theme variable and use the semantic token.

Never scatter hex values throughout components.

---

## Prefer Tailwind Scale Values

Use Tailwind's standard spacing and sizing scale whenever an equivalent exists.

GOOD:

```tsx
w - 10;
h - 10;
p - 4;
gap - 6;
rounded - lg;
max - w - md;
```

AVOID:

```tsx
w-[40px]
h-[40px]
p-[16px]
gap-[24px]
rounded-[8px]
max-w-[448px]
```

Arbitrary values are allowed only when the design genuinely requires a value not represented reasonably by Tailwind's scale.

Do not mechanically translate every Figma pixel value into an arbitrary Tailwind value.

---

## Design System

The generated C-Ride design is the visual reference.

Maintain a consistent system for:

- typography
- spacing
- radius
- colors
- cards
- form controls
- status indicators
- buttons

Define reusable theme values centrally.

Do not introduce one-off styling decisions on individual screens when a design token can represent them.

---

## Server State

Use TanStack Query for all API/server state.

Do not fetch server data manually with `useEffect`.

BAD:

```tsx
useEffect(() => {
  fetch("/rides").then(...)
}, [])
```

Use queries instead.

Feature queries and mutations belong with their feature:

```text
features/
└── rider/
    └── active-ride/
        ├── components/
        ├── queries/
        │   ├── ride.queries.ts
        │   └── ride.mutations.ts
        └── types/
```

Prefer reusable query options/query keys where appropriate.

Examples:

```text
rideKeys.detail(rideId)
rideKeys.history()
rideKeys.available()
```

Mutations should invalidate or update the relevant query cache.

Do not duplicate API fetching logic across components.

---

## API Layer

HTTP configuration belongs in:

```text
src/lib/api/
```

For example:

```text
lib/api/
├── client.ts
├── auth.ts
└── errors.ts
```

The API client owns concerns such as:

- base URL
- authentication headers
- response parsing
- shared error handling

Components must not repeatedly implement raw fetch configuration.

---

## WebSockets

Configure the Socket.IO client centrally:

```text
src/lib/socket.ts
```

Feature-specific socket behavior belongs inside the relevant feature.

For example:

```text
features/rider/active-ride/hooks/use-ride-socket.ts
```

Do not mix general socket initialization with ride-specific behavior.

REST/TanStack Query remains the authoritative server-state mechanism.

WebSocket events should update or invalidate relevant query state rather than creating a completely separate source of truth.

---

## Forms

Use:

- React Hook Form
- Zod
- shadcn Form components

Keep schemas outside large JSX components.

Example:

```text
features/driver/registration/
├── components/
├── schemas/
│   └── driver-registration.schema.ts
└── types/
```

Do not implement large amounts of manual form validation inside submit handlers.

---

## State

Use the simplest appropriate state mechanism.

Use:

```text
TanStack Query → server state

React Hook Form → form state

useState/useReducer → local UI state
```

Do not introduce a global state library unless there is a concrete need.

Keep state as close as possible to where it is used.

---

## Rider and Driver

This is **one React application**, not two applications.

Rider and Driver may have:

- different layouts
- different navigation
- different routes
- different feature components

but should share:

- design system
- authentication infrastructure
- API infrastructure
- query infrastructure
- common components

Do not duplicate shared functionality simply because the actors differ.

---

## Current Screens

The application currently targets:

```text
Authentication
├── Login
├── Rider Signup
└── Driver Signup
    ├── Account details
    └── Vehicle selection/details

Rider
├── Request Ride
└── Active Ride

Driver
├── Available Rides
└── Active Ride
```

Driver signup includes vehicle information:

- choose one of three vehicle images
- car/model name
- plate number
- color

Vehicle selection should be implemented as a reusable feature component rather than three manually duplicated cards.

---

## TypeScript

Use strict TypeScript.

Avoid:

```ts
any;
```

unless there is an exceptional and documented reason.

Prefer explicit domain types:

```ts
Ride;
RideStatus;
User;
UserRole;
Vehicle;
DriverLocation;
```

Do not duplicate API/domain types unnecessarily.

---

## Naming

Use:

```text
Components        PascalCase
Hooks             useSomething
Functions         camelCase
Constants         UPPER_SNAKE_CASE
Folders/files     kebab-case
```

Examples:

```text
vehicle-selector.tsx
ride-status-badge.tsx
use-ride-socket.ts
ride.queries.ts
ride.mutations.ts
```

---

## General Rules

Before creating something new:

1. Check whether it already exists.
2. Check whether shadcn provides it.
3. Check whether an existing shared component can be composed or extended.
4. Only then create a new component.

Avoid premature abstractions.

Avoid giant components.

Avoid duplicated markup.

Avoid duplicated API/query logic.

Avoid inline styles.

Avoid hardcoded colors.

Avoid unnecessary arbitrary Tailwind values.

Avoid unnecessary dependencies.

Prefer readable code over clever code.

Follow existing project conventions when they are more specific than this document.

When implementing from a design, reproduce the design using the existing design system rather than generating a new visual language.
