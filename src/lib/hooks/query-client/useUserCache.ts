import { useQueryClient } from '@tanstack/react-query';

import { getAuthToken } from '@/lib/cookies';
import { IUser } from '@/lib/schema';
import { getTokenExpirationTime } from '@/lib/session';

interface UserCacheData {
  user: IUser;
}

const USER_QUERY_KEY = 'user' as const;

export function useUserCache() {
  const queryClient = useQueryClient();

  const getUserData = (): UserCacheData | undefined => {
    return queryClient.getQueryData<UserCacheData>([USER_QUERY_KEY]);
  };

  const getUser = (): IUser | null => {
    const data = getUserData();
    return data?.user || null;
  };

  const setUserData = (userData: UserCacheData): void => {
    const token = getAuthToken();
    const tokenLifetime = token ? getTokenExpirationTime(token) : 0;

    queryClient.setQueryDefaults([USER_QUERY_KEY], {
      staleTime: tokenLifetime,
      gcTime: tokenLifetime,
    });

    queryClient.setQueryData([USER_QUERY_KEY], userData);
  };

  const clearUserCache: VoidFunction = () => {
    queryClient.removeQueries({ queryKey: [USER_QUERY_KEY] });
  };

  const invalidateUserCache: VoidFunction = () => {
    queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
  };

  return {
    user: getUser(),
    isAuthenticated: !!getUserData(),
    setUserData,
    clearUserCache,
    invalidateUserCache,
  };
}
