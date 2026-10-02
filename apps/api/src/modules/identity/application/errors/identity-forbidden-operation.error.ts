import { IdentityApplicationError } from './identity-application.error';

export class IdentityForbiddenOperationError extends IdentityApplicationError {
  readonly kind = 'forbidden';

  constructor(message = 'You are not allowed to perform this operation') {
    super(message);
  }
}
