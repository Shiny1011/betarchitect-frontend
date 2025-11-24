import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { apiMutation } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';

type HttpMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface MutationVariables<TPayload> {
  endpoint: string;
  method: HttpMethod;
  body?: TPayload | FormData;
  isFormData?: boolean;
  customHeaders?: Record<string, string>;
  idempotent?: boolean;
}

export function useAuthorizedMutation<TResponse = unknown, TPayload = unknown>(
  options?: Omit<UseMutationOptions<TResponse, Error, MutationVariables<TPayload>>, 'mutationFn'>
) {
  const token = getAuthToken();

  return useMutation<TResponse, Error, MutationVariables<TPayload>>({
    ...options,
    mutationFn: async (vars) => {
      const { endpoint, method, body, customHeaders = {}, idempotent, isFormData = false } = vars;

      if (!token) throw new Error('Authorization token not found. Mutation aborted.');

      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
        ...customHeaders,
      };
      if (idempotent) headers['Idempotency-Key'] = crypto.randomUUID();

      const requestBody = body ? (isFormData ? body : JSON.stringify(body)) : undefined;

      return await apiMutation<TResponse>(endpoint, {
        method: method,
        credentials: 'include',
        headers: headers,
        body: requestBody as BodyInit | undefined,
      });
    },
  });
}
