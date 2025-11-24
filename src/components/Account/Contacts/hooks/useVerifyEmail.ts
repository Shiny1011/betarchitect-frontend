import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { IUser } from '@/lib/schema';

interface VerifyEmailPayload {
  value: string;
  type: 'email';
}

interface VerifyEmailResponse {
  success: boolean;
  message: string;
  user: IUser;
  token: string;
}

export function useVerifyEmail() {
  const token = getAuthToken();

  return useMutation<VerifyEmailResponse, Error, VerifyEmailPayload>({
    mutationFn: async (payload) => {
      return await api<VerifyEmailResponse>('/auth/send-otp', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });
}
