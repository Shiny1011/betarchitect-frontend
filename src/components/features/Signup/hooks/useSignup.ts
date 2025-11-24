import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { setAuthToken } from '@/lib/cookies';
import { useSignupStage } from '@/lib/hooks';
import { IUser } from '@/lib/schema';

interface SignupPayload {
  email: string;
  password: string;
  currency: string;
  promo_code?: string;
  market_agreement: boolean;
}

interface SignupResponse {
  success: boolean;
  message: string;
  user: Pick<IUser, 'id' | 'email'>;
  token: string;
  verification_code_sent: boolean;
}

export function useSignup() {
  const { setSignupStage1 } = useSignupStage();

  return useMutation<SignupResponse, Error, SignupPayload>({
    mutationFn: async (payload) => {
      return api<SignupResponse>('/auth/register-init', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(payload),
      });
    },
    onSuccess: ({ token }) => {
      setAuthToken(token);
      setSignupStage1(true);
    },
  });
}
