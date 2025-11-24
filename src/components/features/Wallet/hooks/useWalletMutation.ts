import { useQueryClient } from '@tanstack/react-query';

import { CurrencyType } from '@/constants';
import { createSpecificMutationHook } from '@/lib/hooks';

interface CreateBalancePayload {
  currency_code: string;
  type: CurrencyType;
  amount: number;
}

interface BalanceResponse {
  id: string;
  amount: number;
  type: string;
  currency_code: string;
  currency_symbol: string;
  reason: string;
}

export function useWalletMutation() {
  const queryClient = useQueryClient();

  const useMutateWallet = createSpecificMutationHook<BalanceResponse, CreateBalancePayload>({
    endpoint: '/wallet/balances',
    method: 'POST',
    idempotent: true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      console.log('Successfully added currency');
    },
    onError: (error) => {
      console.error('Failed to create new balance:', error);
    },
  });
  return useMutateWallet();
}
