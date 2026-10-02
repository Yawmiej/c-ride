import { useQueryClient } from '@tanstack/react-query';
import { clearAccessToken } from '@/shared/api';
import { authKeys, useCurrentUser } from '../queries/auth.queries';

export function useAuthSession() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  function signOut() {
    clearAccessToken();
    queryClient.removeQueries({ queryKey: authKeys.all });
  }

  return { ...currentUser, signOut };
}
