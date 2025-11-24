import { useMutation } from '@tanstack/react-query';

import { MANIFEST_DEFAULT_LOCALE } from '@/constants';
import { api } from '@/lib/api';
import { setAuthToken, setLocaleCookie } from '@/lib/cookies';
import { useUserCache } from '@/lib/hooks';
import { IUser } from '@/lib/schema';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user: IUser;
  token: string;
}

export function useLogin() {
  const { setUserData } = useUserCache();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials) => {
      return await api<LoginResponse>('/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: async ({ user, token }) => {
      setLocaleCookie(user.preference?.language || MANIFEST_DEFAULT_LOCALE);
      setAuthToken(token);
      setUserData({ user });
    },
  });
}
