import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rideKeys, type Ride } from '@/entities/ride';
import { apiClient } from '@/shared/api';
import type { RideRequestSubmission } from '../schemas/ride-request.schema';

export function useRequestRideMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pickup, dropoff }: RideRequestSubmission) =>
      apiClient<Ride>('/rides', {
        method: 'POST',
        authenticated: true,
        body: {
          pickupLat: pickup.lat,
          pickupLng: pickup.lng,
          dropoffLat: dropoff.lat,
          dropoffLng: dropoff.lng,
        },
      }),
    onSuccess: (ride) => {
      queryClient.setQueryData(rideKeys.detail(ride.id), ride);
      void queryClient.invalidateQueries({ queryKey: rideKeys.history() });
    },
  });
}
