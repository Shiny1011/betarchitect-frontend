// import { getBonuses } from '../api/getBonuses';
import { useUserCache } from '@/lib/hooks';
import { BonusGrant, BonusStatus } from '@/lib/schema';
// import { useQuery } from '@tanstack/react-query';

// TODO: Remove mock data
const mockData: { grants: BonusGrant[] } = {
  grants: [
    {
      id: 'b65a42fd-e628-4d9f-ad5f-8045a19ed761',
      playerId: '080afe3a-a927-4712-800b-9320861cd227',
      playerEmail: 'philip@betarchitect.io',
      playerUsername: 'johndoe123',
      bonusDefinitionId: 'c60d8a01-d5f1-4bc6-9e64-ca7b686b0e71',
      bonusDefinitionName: 'cashback_10x',
      status: 'active',
      currencyCode: 'USD',
      amountGranted: 25,
      amountRemaining: 34,
      winningsBucket: 0,
      wagerTarget: 0,
      wagerProgress: 12,
      completionPercentage: 100,
      isWithdrawalBlocked: true,
      isWrZero: true,
      promoCodeUsed: null,
      grantedAt: '2025-10-29T03:32:01.000Z',
      activatedAt: '2025-10-29T03:32:09.000Z',
      expiresAt: null,
      createdAt: '2025-10-29T01:36:32.365Z',
      updatedAt: '2025-10-29T01:36:32.365Z',
    },
    {
      id: 'f606d397-b050-44da-a4d2-318ae21492d1',
      playerId: '080afe3a-a927-4712-800b-9320861cd227',
      playerEmail: 'philip@betarchitect.io',
      playerUsername: 'johndoe123',
      bonusDefinitionId: 'c60d8a01-d5f1-4bc6-9e64-ca7b686b0e71',
      bonusDefinitionName: 'cashback_10x',
      status: 'active',
      currencyCode: 'USDT',
      amountGranted: 335,
      amountRemaining: 24,
      winningsBucket: 2,
      wagerTarget: 0,
      wagerProgress: 24,
      completionPercentage: 100,
      isWithdrawalBlocked: true,
      isWrZero: true,
      promoCodeUsed: null,
      grantedAt: '2025-10-21T05:46:18.000Z',
      activatedAt: '2025-10-20T05:46:23.000Z',
      expiresAt: '2025-11-05T05:46:33.000Z',
      createdAt: '2025-10-28T05:46:07.000Z',
      updatedAt: '2025-10-28T05:46:11.000Z',
    },
  ],
};

export const useBonuses = (status: BonusStatus) => {
  const { user } = useUserCache();

  // const { data } = useQuery({
  //   queryKey: ['bonuses', status],
  //   queryFn: () => getBonuses(status, user?.id!),
  //   enabled: !!user?.id,
  // });

  return { bonuses: mockData.grants };
};
