import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rideKeys, type Ride } from '@/entities/ride';
import { apiClient } from '@/shared/api';

export function useAcceptRideMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rideId: string) =>
      apiClient<Ride>(`/rides/${encodeURIComponent(rideId)}/accept`, {
        method: 'PATCH',
        authenticated: true,
      }),
    onSuccess: (ride) => {
      queryClient.setQueryData(rideKeys.detail(ride.id), {
        ...ride,
        driver: null,
      });
      void queryClient.invalidateQueries({ queryKey: rideKeys.active() });
    },
  });
}
