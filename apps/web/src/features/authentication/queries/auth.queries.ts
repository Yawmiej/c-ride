import { useQuery } from '@tanstack/react-query';
import { apiClient, getAccessToken } from '@/shared/api';
import type { AuthenticatedUser } from '../types/auth.types';

export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'current-user'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: () => apiClient<AuthenticatedUser>('/auth/me', { authenticated: true }),
    enabled: Boolean(getAccessToken()),
    retry: false,
    staleTime: 5 * 60_000,
  });
}
