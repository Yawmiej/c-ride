import { ApplicationError } from '@/shared/errors/application-error';

export class DriverOnboardingConflictError extends ApplicationError {
  readonly kind = 'conflict';

  constructor(message = 'Driver onboarding cannot be completed') {
    super(message);
  }
}
