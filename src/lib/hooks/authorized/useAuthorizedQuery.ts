import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';

interface AuthorizedQueryOptions<TData, TError, TQueryKey extends QueryKey>
  extends Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryFn'> {
  endpoint: string;
}

export function useAuthorizedQuery<TData = unknown, TError = Error, TQueryKey extends QueryKey = QueryKey>(
  options: AuthorizedQueryOptions<TData, TError, TQueryKey>
) {
  const token = getAuthToken();
  const { endpoint, ...restOptions } = options;
  const enabled = options.enabled === undefined ? !!token : options.enabled && !!token;

  return useQuery<TData, TError, TData, TQueryKey>({
    ...restOptions,
    queryFn: async () => {
      if (!token) throw new Error('Authorization token not found.');

      return await api<TData>(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled,
  });
}
