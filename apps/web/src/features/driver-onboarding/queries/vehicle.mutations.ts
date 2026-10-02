import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';
import { authKeys } from '@/features/authentication/queries/auth.queries';
import type { AuthenticatedUser, DriverProfile } from '@/features/authentication/types/auth.types';
import type { VehicleOnboardingRequest } from '../types/vehicle.types';

export function useVehicleOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: VehicleOnboardingRequest) =>
      apiClient<DriverProfile>('/drivers/me/vehicle', {
        method: 'POST',
        authenticated: true,
        body: request,
      }),
    onSuccess: (driverProfile) => {
      queryClient.setQueryData<AuthenticatedUser>(authKeys.currentUser(), (user) =>
        user ? { ...user, driverProfile } : user,
      );
    },
  });
}
