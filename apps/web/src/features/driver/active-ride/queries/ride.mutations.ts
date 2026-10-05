import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rideKeys, type Ride, type RideStatus } from '@/entities/ride';
import { apiClient } from '@/shared/api';

type DriverRideStatus = Extract<RideStatus, 'IN_PROGRESS' | 'COMPLETED'>;

export function useChangeRideStatusMutation(rideId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: DriverRideStatus) =>
      apiClient<Ride>(`/rides/${encodeURIComponent(rideId)}/status`, {
        method: 'PATCH',
        authenticated: true,
        body: { status },
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) }),
        queryClient.invalidateQueries({ queryKey: rideKeys.active() }),
        queryClient.invalidateQueries({ queryKey: rideKeys.history() }),
      ]);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) });
    },
  });
}
