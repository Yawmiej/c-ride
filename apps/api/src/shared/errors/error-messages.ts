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
  DRIVER_INELIGIBLE:
    'You must have an active driver account, profile, and vehicle to accept rides',
  RIDE_DISCOVERY_FORBIDDEN:
    'You must have an active driver account, profile, and vehicle to view available rides',
  RIDE_EVENT_INVALID_PAYLOAD: 'Stored ride event payload is invalid',
  RIDE_STATUS_CHANGED:
    'The ride changed before this update could be saved. Refresh and try again',
  RIDE_UNAVAILABLE: 'This ride is no longer available for acceptance',
  RIDE_TRANSITION_INVALID: 'This ride status transition is not allowed',
  RIDE_TRANSITION_FORBIDDEN: 'You are not allowed to change this ride status',
  RIDE_ACCESS_FORBIDDEN: 'You are not allowed to access this ride',

  NOT_FOUND: (item: string) => `${item} not found`,
  ALREADY_EXISTS: (item: string) => `${item} already exists`,
  MISSING_ENVIRONMENT_VARIABLES: (variables: readonly string[]) =>
    `Missing required environment variables: ${variables.join(', ')}`,
} as const;
