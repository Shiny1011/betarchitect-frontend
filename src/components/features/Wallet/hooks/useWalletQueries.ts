import { useAuthorizedQuery } from '@/lib/hooks';

interface Balance {
  id: string;
  amount: number;
  type: string;
  currency_code: string;
  currency_symbol: string;
  reason: string;
}

export function useWalletQuery() {
  return useAuthorizedQuery<Balance[], Error, ['wallet']>({
    queryKey: ['wallet'],
    endpoint: '/wallet/balances',
  });
}
