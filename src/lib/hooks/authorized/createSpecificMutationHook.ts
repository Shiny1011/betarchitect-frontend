import { UseMutationOptions } from '@tanstack/react-query';

import { useAuthorizedMutation, MutationVariables } from './useAuthorizedMutation';

// generic type for options
type SpecificMutationOptions<TResponse, TPayload> = UseMutationOptions<TResponse, Error, TPayload, unknown>;

// generic type for mutate function seen by component
type SpecificMutateFunction<TResponse, TPayload> = (
  payload: TPayload,
  options?: SpecificMutationOptions<TResponse, TPayload>
) => void;

// generic type for the hook result
interface SpecificMutationResult<TResponse, TPayload> {
  mutate: SpecificMutateFunction<TResponse, TPayload>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
}

// generic type for configuring static parameters
interface MutationConfig<TResponse, TPayload> {
  endpoint: string;
  method: MutationVariables<TPayload>['method'];
  isFormData?: boolean;
  idempotent?: boolean;
  onSuccess?: UseMutationOptions<TResponse, Error, MutationVariables<TPayload>>['onSuccess'];
  onError?: UseMutationOptions<TResponse, Error, MutationVariables<TPayload>>['onError'];
}

export function createSpecificMutationHook<TResponse = unknown, TPayload = unknown>(
  config: MutationConfig<TResponse, TPayload>
) {
  return function useSpecificMutation(): SpecificMutationResult<TResponse, TPayload> {
    const mutation = useAuthorizedMutation<TResponse, TPayload>({
      onSuccess: config.onSuccess,
      onError: config.onError,
    });

    // Creating a wrapped mutate function
    const specificMutate: SpecificMutateFunction<TResponse, TPayload> = (
      payload: TPayload,
      options?: SpecificMutationOptions<TResponse, TPayload>
    ) => {
      const fullMutationVars: MutationVariables<TPayload> = {
        endpoint: config.endpoint,
        method: config.method,
        isFormData: config.isFormData,
        idempotent: config.idempotent,
        body: payload,
      } as MutationVariables<TPayload>;

      mutation.mutate(fullMutationVars, options as any);
    };

    return {
      mutate: specificMutate,
      isLoading: mutation.isPending,
      isError: mutation.isError,
      isSuccess: mutation.isSuccess,
      error: mutation.error as Error | null,
    };
  };
}
