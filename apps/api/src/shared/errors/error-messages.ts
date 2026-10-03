export const ERROR_MESSAGES = {
  INVALID_AUTHENTICATION: 'Invalid authentication',
  INVALID_CREDENTIALS: 'Invalid email or password',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  OPERATION_FORBIDDEN: 'Operation is forbidden',
  REGISTRATION_CONFLICT:
    'An account with this email or phone number already exists',
  DRIVER_ONBOARDING_UNAVAILABLE: 'Driver onboarding is no longer available',
  DRIVER_ONBOARDING_REQUIRES_PENDING:
    'Only pending drivers can complete onboarding',
  DRIVER_ALREADY_HAS_VEHICLE: 'A driver profile can have only one vehicle',
  VEHICLE_PROFILE_MISMATCH: 'A vehicle must belong to its driver profile',
  LICENSE_PLATE_IN_USE: 'License plate is already in use',
  RIDE_ACCESS_FORBIDDEN: 'You are not allowed to access this ride',
  NOT_FOUND: (item: string) => `${item} not found`,
  ALREADY_EXISTS: (item: string) => `${item} already exists`,
  MISSING_ENVIRONMENT_VARIABLES: (variables: readonly string[]) =>
    `Missing required environment variables: ${variables.join(', ')}`,
} as const;
