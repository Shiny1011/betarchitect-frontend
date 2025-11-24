import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { useUserCache, useSignupStage } from '@/lib/hooks';
import { IUser } from '@/lib/schema';

interface SignupDetailsPayload {
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  phone_code: string;
  phone_number?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  country_id?: string;
}

interface SignupDetailsResponse {
  success: boolean;
  message: string;
  user: IUser;
}

export function useSignupDetails() {
  const { setUserData } = useUserCache();
  const { clearSignupStage } = useSignupStage();

  const token = getAuthToken();

  return useMutation<SignupDetailsResponse, Error, SignupDetailsPayload>({
    mutationFn: async (payload) => {
      return api<SignupDetailsResponse>('/auth/register-complete', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: ({ user }) => {
      clearSignupStage();
      setUserData({ user });
    },
  });
}
