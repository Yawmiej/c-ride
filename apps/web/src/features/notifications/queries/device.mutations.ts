import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/shared/api';

interface DeviceResponse {
  id: string;
  platform: 'WEB';
  createdAt: string;
  updatedAt: string;
}

export function useRegisterDeviceMutation() {
  return useMutation({
    mutationFn: (token: string) =>
      apiClient<DeviceResponse>('/devices', {
        authenticated: true,
        method: 'POST',
        body: { token, platform: 'WEB' },
      }),
  });
}
