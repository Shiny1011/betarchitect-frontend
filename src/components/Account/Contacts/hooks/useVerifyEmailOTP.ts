import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { IUser } from '@/lib/schema';

interface VerifyEmailOTPPayload {
  token: string;
  value: string;
  type: 'email';
}

interface VerifyEmailOTPResponse {
  success: boolean;
  message: string;
  user: IUser;
  session: unknown;
  token: string;
}

export function useVerifyEmailOTP() {
  const token = getAuthToken();

  return useMutation<VerifyEmailOTPResponse, Error, VerifyEmailOTPPayload>({
    mutationFn: async (payload) => {
      return await api<VerifyEmailOTPResponse>('/auth/verify-otp', {
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
