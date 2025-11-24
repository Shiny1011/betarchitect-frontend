'use server';

import { cookies } from 'next/headers';

import { AUTH_TOKEN } from '@/constants';
import { api } from '@/lib/api';
import { IAuthData } from '@/lib/schema';

export const getSessionData = async (): Promise<IAuthData | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN);

  if (!token) return null;

  const response = await api<IAuthData>('/auth/session', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  return response;
};
