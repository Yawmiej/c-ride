# C-Ride Backend Agent Context

Use a NestJS modular monolith organized by business domain.

- Current domains: `identity`, `rides`, `notifications`.
- `RIDER` and `DRIVER` are roles/actors, not separate top-level backend modules.
- Root `infrastructure` is technology-specific and business-agnostic.
- Domain-specific adapters belong inside the owning module.
- Configuration must flow through the config layer.
- Do not add authentication, ride, WebSocket, job, notification, or persistence business logic during scaffolding.
