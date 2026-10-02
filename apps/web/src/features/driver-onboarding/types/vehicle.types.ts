import type { VehicleType } from '@/features/authentication/types/auth.types';

export type VehicleOptionData = {
  id: VehicleType;
  label: string;
  description: string;
  imageSrc: string;
};

export type VehicleOnboardingRequest = {
  type: VehicleType;
  make: string;
  model: string;
  color: string;
  year?: number;
  licensePlate: string;
};
