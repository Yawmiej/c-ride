import { IdentityApplicationError } from './identity-application.error';

export class AuthenticationError extends IdentityApplicationError {
  readonly kind = 'authentication';

  constructor() {
    super('Invalid email or password');
  }
}
