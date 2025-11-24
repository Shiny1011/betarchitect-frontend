import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface PasswordRecoveryResponse {
  success: boolean;
  message: string;
}

interface PasswordRecoveryPayload {
  email: string;
}

export const usePasswordRecovery = () => {
  return useMutation<PasswordRecoveryResponse, Error, PasswordRecoveryPayload>({
    mutationFn: async (payload) => {
      return await api<PasswordRecoveryResponse>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
};
