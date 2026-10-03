import { ApplicationErrorKind } from './error-kinds';

export type { ApplicationErrorKind } from './error-kinds';

export class ApplicationError extends Error {
  constructor(
    readonly kind: ApplicationErrorKind,
    message: string,
  ) {
    super(message);
    this.name = ApplicationError.name;
  }
}
