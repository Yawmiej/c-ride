import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rideKeys, type Ride } from '@/entities/ride';
import { apiClient } from '@/shared/api';

export function useCancelRideMutation(rideId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiClient<Ride>(`/rides/${encodeURIComponent(rideId)}/status`, {
        method: 'PATCH',
        authenticated: true,
        body: { status: 'CANCELLED' },
      }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) }),
        queryClient.invalidateQueries({ queryKey: rideKeys.history() }),
      ]);
    },
    onError: () => {
      void queryClient.invalidateQueries({ queryKey: rideKeys.detail(rideId) });
    },
  });
}
