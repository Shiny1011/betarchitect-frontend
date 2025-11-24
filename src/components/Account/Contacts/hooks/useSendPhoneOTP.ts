import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { IUser } from '@/lib/schema';

interface SendPhoneOTPPayload {
  phone_code: string;
  phone_number: string;
}

interface SendPhoneOTPResponse {
  success: boolean;
  message: string;
  user: IUser;
  token: string;
}

export function useSendPhoneOTP() {
  const token = getAuthToken();

  return useMutation<SendPhoneOTPResponse, Error, SendPhoneOTPPayload>({
    mutationFn: async (payload) => {
      return await api<SendPhoneOTPResponse>('/auth/send-phone-otp', {
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
