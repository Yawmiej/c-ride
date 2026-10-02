# C-Ride Workspace

This repository is a Turborepo monorepo for the C-Ride assessment.

- `apps/api` contains the NestJS backend.
- `apps/web` contains the React + Vite frontend.
- `packages/typescript-config` contains shared TypeScript configuration.
- `packages/eslint-config` contains shared ESLint configuration.

Keep implementation scoped to the requested phase. The initial scaffold should not add authentication, ride, notification, or persistence business logic.

## Backend Architecture

- Follow DDD/Clean Architecture within each backend bounded context: `application`, `domain`, `infrastructure`, and `presentation`, composed by `<context>.module.ts`. Follow the detailed rules in `apps/api/AGENTS.md`.
- Identity owns accounts and authentication; drivers owns driver profiles, vehicles, and onboarding; rides owns ride lifecycle and audit history; notifications owns devices and notification delivery. `RIDER` and `DRIVER` remain user roles.
- Define repository contracts as abstract classes in the owning context's `domain/repositories`. Bind the class directly with `{ provide: UserRepository, useClass: PrismaUserRepository }` and inject the abstract class. Use abstract classes for other injected application boundaries too; interfaces remain appropriate for data shapes.
- Keep business rules in domain entities/policies and workflow orchestration in named application use cases. Keep transport concerns in presentation and technical adapters in infrastructure.

## Implementation Cycle Review

- After every implementation cycle, review all modules, classes, and functions added or changed, plus their affected callers and dependencies. Check responsibility, layer placement, dependency direction, provider bindings/exports, domain invariants, authorization, error handling, and response safety.
- Resolve findings within the requested scope, run relevant formatting/type/build checks and focused behavioral tests, and report any verification blocked by unavailable services.
- Reconcile the implementation checklist with verified behavior. Mark a task complete only when its acceptance criteria are met; an empty class or successful compilation alone does not prove a workflow is complete.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
