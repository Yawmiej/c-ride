import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, clearAccessToken, setAccessToken } from '@/shared/api';
import { authKeys } from './auth.queries';
import type {
  AuthenticationResponse,
  DriverRegistrationRequest,
  LoginRequest,
  RiderRegistrationRequest,
} from '../types/auth.types';

type RegistrationRequest = RiderRegistrationRequest | DriverRegistrationRequest;

function useAuthenticationMutation<TRequest extends LoginRequest | RegistrationRequest>(
  path: '/auth/login' | '/auth/register',
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: TRequest) => {
      const response = await apiClient<AuthenticationResponse>(path, {
        method: 'POST',
        body: request,
      });
      setAccessToken(response.accessToken);
      let user: AuthenticationResponse['user'];
      try {
        user = await apiClient<AuthenticationResponse['user']>('/auth/me', {
          authenticated: true,
        });
      } catch (error) {
        clearAccessToken();
        throw error;
      }

      return { ...response, user };
    },
    onSuccess: (response) => {
      queryClient.setQueryData(authKeys.currentUser(), response.user);
    },
  });
}

export function useLoginMutation() {
  return useAuthenticationMutation<LoginRequest>('/auth/login');
}

export function useRiderSignupMutation() {
  return useAuthenticationMutation<RiderRegistrationRequest>('/auth/register');
}

export function useDriverSignupMutation() {
  return useAuthenticationMutation<DriverRegistrationRequest>('/auth/register');
}
