import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiError } from '@/shared/api';
import { rideKeys } from './ride.keys';
import type { Ride, RideDetails, RideHistory } from './types';

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

const activeRideStatuses = new Set(['REQUESTED', 'ACCEPTED', 'IN_PROGRESS']);

export function useActiveRideQuery() {
  return useQuery({
    queryKey: rideKeys.active(),
    queryFn: async (): Promise<Ride | null> => {
      const history = await apiClient<RideHistory>('/rides/history?limit=20', {
        authenticated: true,
      });
      return (
        history.items.find((ride) => activeRideStatuses.has(ride.status)) ??
        null
      );
    },
    staleTime: 0,
    retry: (count, error) => {
      if (error instanceof ApiError && error.status < 500) return false;
      return count < 1;
    },
  });
}
