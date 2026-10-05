# C-Ride Assessment

This repository is a Turborepo monorepo for the C-Ride assessment

## Project Structure

- `apps/api`: NestJS backend
- `apps/web`: React frontend
- `packages/typescript-config`: Shared TypeScript configuration
- `packages/eslint-config`: Shared ESLint configuration

## Requirements

- Node.js 22.x
- pnpm 9.x
- Postgres
- Redis
- Firebase
- Google Maps API

## Running the Project

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

3. Run the database migrations:

```bash
cd apps/api
pnpm run db:migrate
```

4. Seed the database:

```bash
cd apps/api
pnpm run db:seed
```

5. Run the project:

```bash
pnpm run dev
```

## Seeded test accounts

Running the seed command creates the following local accounts. Every seeded account uses the password `Password123!`.

| Role | Email | Status |
| --- | --- | --- |
| Rider | `rider@example.com` | Active |
| Driver | `driver.one@example.com` | Active, with a Toyota Camry |
| Driver | `driver.two@example.com` | Active, with a Honda CR-V |
| Driver | `pending.driver@example.com` | Pending onboarding, without a vehicle |

## Project Links

- [Repository](https://github.com/Yawmiej/c-ride)
- [Backend URL](https://cride-api.up.railway.app/api/v1)
- [Frontend URL](https://cride.up.railway.app)
- [Swagger Documentation](https://cride-api.up.railway.app/api/v1/docs)

## Submission Answers

See [SUBMISSION.md](SUBMISSION.md) for the answers to the submission questions.
