'use client';

import { createContext, useContext } from 'react';

import { useUserCache } from '@/lib/hooks';
import { IAuthData } from '@/lib/schema';

interface AuthProviderProps {
  children: React.ReactNode;
  session: IAuthData | null;
}

const AuthContext = createContext<IAuthData | null>(null);

export function AuthProvider({ children, session }: AuthProviderProps) {
  const { setUserData } = useUserCache();

  if (session?.user) {
    setUserData({ user: session.user });
  }

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
