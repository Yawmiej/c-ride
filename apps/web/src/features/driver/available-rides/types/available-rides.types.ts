import type { Ride } from '@/entities/ride';

export type AvailableRidesResponse = {
  items: Ride[];
};

export type RideSocketError = {
  event: string;
  code: string;
  message: string;
};
