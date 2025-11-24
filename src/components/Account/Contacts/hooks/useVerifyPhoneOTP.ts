import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { IUser } from '@/lib/schema';

interface VerifyPhoneOTPPayload {
  phone_code: string;
  phone_number: string;
  code: string;
}

interface VerifyPhoneOTPResponse {
  success: boolean;
  message: string;
  user: IUser;
  token: string;
}

export function useVerifyPhoneOTP() {
  const token = getAuthToken();

  return useMutation<VerifyPhoneOTPResponse, Error, VerifyPhoneOTPPayload>({
    mutationFn: async (payload) => {
      return await api<VerifyPhoneOTPResponse>('/auth/verify-phone', {
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
