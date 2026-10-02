import { IdentityApplicationError } from './identity-application.error';

export class RegistrationConflictError extends IdentityApplicationError {
  readonly kind = 'conflict';

  constructor() {
    super('An account with this email or phone number already exists');
  }
}
