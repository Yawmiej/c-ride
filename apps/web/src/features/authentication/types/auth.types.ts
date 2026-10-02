export const userRoles = ['RIDER', 'DRIVER'] as const;
export type UserRole = (typeof userRoles)[number];

export type VehicleType = 'SEDAN' | 'SUV' | 'HATCHBACK';

export type DriverProfile = {
  id: string;
  userId: string;
  status: 'PENDING_ONBOARDING' | 'ACTIVE' | 'SUSPENDED';
  vehicle: {
    id: string;
    type: VehicleType;
    make: string;
    model: string;
    color: string;
    year: number | null;
    licensePlate: string;
  } | null;
};

export type AuthenticatedUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  role: UserRole;
  status: 'ACTIVE' | 'SUSPENDED' | 'DISABLED';
  driverProfile?: DriverProfile | null;
};

export type AuthenticationResponse = {
  accessToken: string;
  user: AuthenticatedUser;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RiderRegistrationRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'RIDER';
};

export type DriverRegistrationRequest = Omit<RiderRegistrationRequest, 'role'> & {
  role: 'DRIVER';
};
