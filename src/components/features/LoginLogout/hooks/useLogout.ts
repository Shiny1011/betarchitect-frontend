import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { clearAuthToken, getAuthToken } from '@/lib/cookies';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const token = getAuthToken() || '';

  return useMutation({
    mutationFn: async () => {
      await api('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ token }),
      });
    },
    onSuccess: () => {
      clearAuthToken();
      queryClient.clear();
      router.push('/');
    },
  });
}
