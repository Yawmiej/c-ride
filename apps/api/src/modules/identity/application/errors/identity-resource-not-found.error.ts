import { IdentityApplicationError } from './identity-application.error';

export class IdentityResourceNotFoundError extends IdentityApplicationError {
  readonly kind = 'not-found';

  constructor(message = 'Resource not found') {
    super(message);
  }
}
