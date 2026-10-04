# C-Ride API

NestJS backend for the C-Ride assessment.

Implemented workflows include authentication, driver onboarding, and ride creation/retrieval. Ride lifecycle foundations are described below.

## Ride rules (Phase 5.1–5.2)

The ride domain permits REQUESTED → ACCEPTED → IN_PROGRESS → COMPLETED.
Acceptance assigns the acting driver; only the assigned driver may start or
complete the ride. The rider may cancel while REQUESTED or ACCEPTED, and the
assigned driver may cancel while ACCEPTED. COMPLETED and CANCELLED are terminal.
Cancellation after the ride starts is not supported.

The public `DriverEligibility.execute(userId)` contract reloads the account and
profile and requires an ACTIVE account with DRIVER role, an ACTIVE driver
profile, and a vehicle. It returns false for an unavailable account or profile.
The existing global IdentityModule supplies the public account lookup without a
circular module import or exposing credentials.

These are domain/application foundations. Acceptance and status HTTP endpoints
and their persistence are deferred to Phases 5.3–5.6. Acceptance must check driver
eligibility before applying the domain transition. Tests are deferred by request.
