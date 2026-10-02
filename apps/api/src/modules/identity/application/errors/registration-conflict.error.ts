export class RegistrationConflictError extends Error {
  constructor() {
    super('An account with this email or phone number already exists');
    this.name = 'RegistrationConflictError';
  }
}
