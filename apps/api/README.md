# C-Ride API

NestJS backend for the C-Ride assessment.

Implemented workflows include authentication, driver onboarding, ride creation/retrieval, driver acceptance, and ride status updates. Ride lifecycle foundations are described below.

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

## Driver acceptance (Phase 5.3–5.5)

`PATCH /api/v1/rides/:id/accept` requires a driver bearer token. No body is needed;
the driver ID comes from the authenticated user, never from request body data.

1. JWT authentication reloads the account and rejects inactive users. The role
   guard restricts this operation to DRIVER.
2. `AcceptRideUseCase` checks driver eligibility through the drivers application
   boundary. It loads the ride, rejects missing/unavailable rides, and asks the
   domain transition policy whether this driver can accept it.
3. `RideAcceptance` is the abstract persistence boundary. Its Prisma adapter opens
   a PostgreSQL transaction at READ COMMITTED isolation.
4. The drivers-owned persistence helper takes FOR SHARE locks on the driver's
   account, profile, and vehicle. It reloads their state and applies the same
   eligibility policy. These locks block changes/deletions of those rows until
   the acceptance transaction finishes.
5. A conditional UPDATE assigns the driver and changes the status to ACCEPTED
   only where the ride ID matches, status is REQUESTED, and driverId is null.
   This is the decisive concurrency check; the earlier application read alone
   cannot guarantee the ride is still available.
6. One updated row means success. Zero updated rows returns a typed conflict,
   which the use case maps to HTTP 409. On success the adapter reads the saved
   ride inside the transaction, commits, and then returns it for safe response
   mapping. A database error rolls back the transaction.

For two drivers accepting the same ride, PostgreSQL serializes their updates to
that row. If the first commits, the second rechecks its WHERE condition against
the updated row. The ride is now ACCEPTED with a driver, so the second update
matches zero rows and cannot overwrite the winner. If the first rolls back,
the second can still succeed. This works across API processes because the
coordination happens in PostgreSQL, not in a JavaScript lock or Redis.

Responses: 200 for success, 400 for an invalid ride UUID, 401 for failed
authentication, 403 for a non-driver/ineligible driver, 404 for a missing ride,
and 409 for an unavailable ride or lost acceptance race. Repeating acceptance
after success also returns 409; no idempotency mechanism is added.

`UpdateRideStatusDto` accepts only IN_PROGRESS, COMPLETED, or CANCELLED. It
cannot request ACCEPTED or reset a ride to REQUESTED. The global validation pipe
rejects extra fields such as driverId. The status endpoint uses this DTO and the domain transition policy.

### PostgreSQL verification

Run from `apps/api` with a configured PostgreSQL DATABASE_URL and applied schema:

```sh
RUN_DATABASE_TESTS=1 pnpm run test --runInBand --runTestsByPath src/modules/rides/ride-acceptance.integration.spec.ts
```

The test creates one rider, two eligible drivers, and one requested ride. It
synchronizes the real ride reads so both HTTP requests see REQUESTED before
continuing, then asserts one 200, one 409, and the persisted winning driver.
It uses real authentication, provider wiring, Prisma, and PostgreSQL, and removes
only its own fixtures. Other tests remain deferred by request.

## Ride status updates (Phase 5.6)

`PATCH /api/v1/rides/:id/status` accepts a bearer token and a body such as:

```json
{ "status": "IN_PROGRESS" }
```

The assigned driver can change ACCEPTED to IN_PROGRESS and IN_PROGRESS to
COMPLETED. The owning rider can cancel REQUESTED or ACCEPTED; the assigned
driver can cancel ACCEPTED. COMPLETED and CANCELLED are terminal, and a ride
cannot be cancelled once IN_PROGRESS.

`ChangeRideStatusUseCase` loads the ride, requires the authenticated actor to
be a participant, and applies `Ride.transitionTo`. Acceptance is rejected here
even for internal callers, so it must use the dedicated acceptance workflow.
The repository updates only the status, matching the ride ID, previous status,
and participants in one conditional UPDATE that returns the saved row. If a
competing request changes the ride first, the update matches no row and returns
409 instead of overwriting the newer state. No extra transaction wrapper is
needed for this single database statement.

The endpoint returns the saved ride with 200; malformed input gives 400,
unrelated/unauthorized actors give 403, missing rides give 404, and invalid
transitions or stale writes give 409. Authentication failures give 401.
No new behavioral tests were added or run for this phase. The existing test
repository was updated only to satisfy the expanded repository contract.

## Ride events (Phase 6.1–6.3)

Ride events record the ride ID, actor ID, event type, timestamp, actor role, and
previous/new status. Domain event values match the database: REQUESTED, ACCEPTED,
IN_PROGRESS, COMPLETED, and CANCELLED. The domain key STARTED uses the value
IN_PROGRESS. No enum translation tables or schema changes are needed.

Creation uses `RideRepository.create`. `PrismaRideRepository` inserts the ride
and one requested event in a single transaction. The rider is
the actor; previous status is null and new status is REQUESTED. The event uses
the ride's creation timestamp.

Acceptance supplies an accepted event through the existing `RideAcceptance`
contract. The adapter first checks eligibility and conditionally assigns the
ride. Only the successful assignment inserts the event, in the same transaction.
The winning driver is the actor; the transition is REQUESTED to ACCEPTED.
A rejected/losing request inserts no event. If either event insert fails, the
corresponding ride creation/assignment rolls back.

`RideEventRepository.findByRideId` reads events in chronological order with an
ID tie-breaker. It is an internal persistence boundary; no event-history endpoint
is introduced. Ride HTTP response shapes remain unchanged. Existing rides are
not backfilled. Started/completed/cancelled event writes remain Phase 6.4.

Tests are deferred by request; event persistence, read mapping, and rollback
behavior have not been exercised against PostgreSQL in this phase.
