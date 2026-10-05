import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiError } from '@/shared/api';
import { rideKeys } from './ride.keys';
import type { Ride, RideDetails } from './types';

export function useRideQuery(rideId: string) {
  return useQuery({
    queryKey: rideKeys.detail(rideId),
    queryFn: () =>
      apiClient<RideDetails>(`/rides/${encodeURIComponent(rideId)}`, {
        authenticated: true,
      }),
    staleTime: 0,
    retry: (count, error) => {
      if (error instanceof ApiError && error.status < 500) return false;
      return count < 1;
    },
  });
}

export function useActiveRideQuery() {
  return useQuery({
    queryKey: rideKeys.active(),
    queryFn: () =>
      apiClient<Ride | null>('/rides/active', {
        authenticated: true,
      }),
    staleTime: 0,
    retry: (count, error) => {
      if (error instanceof ApiError && error.status < 500) return false;
      return count < 1;
    },
  });
}
