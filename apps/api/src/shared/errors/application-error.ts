export type ApplicationErrorKind =
  | 'authentication'
  | 'forbidden'
  | 'not-found'
  | 'conflict';

export abstract class ApplicationError extends Error {
  abstract readonly kind: ApplicationErrorKind;

  protected constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}
