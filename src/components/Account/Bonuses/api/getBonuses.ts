import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';
import { BonusGrant, BonusStatus } from '@/lib/schema';

interface IBonusesResponse {
  grants: BonusGrant[];
}

export const getBonuses = async (status: BonusStatus, playerId: string, search?: string): Promise<IBonusesResponse> => {
  const token = getAuthToken();

  const bonuses = await api<IBonusesResponse>(`/bonuses?status=${status}&playerId=${playerId}&search=${search || ''}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!bonuses) {
    throw new Error('Failed to fetch bonuses');
  }

  return bonuses;
};
