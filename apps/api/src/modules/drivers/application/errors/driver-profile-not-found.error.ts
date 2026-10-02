import { ApplicationError } from '@/shared/errors/application-error';

export class DriverProfileNotFoundError extends ApplicationError {
  readonly kind = 'not-found';

  constructor() {
    super('Driver profile not found');
  }
}
