export const ERROR_KINDS = {
  AUTHENTICATION: 'authentication',
  FORBIDDEN: 'forbidden',
  NOT_FOUND: 'not-found',
  CONFLICT: 'conflict',
} as const;

export type ApplicationErrorKind =
  (typeof ERROR_KINDS)[keyof typeof ERROR_KINDS];
