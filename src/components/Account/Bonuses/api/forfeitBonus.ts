import { api } from '@/lib/api';
import { getAuthToken } from '@/lib/cookies';

interface IBonusResponse {
  message: string;
  success: boolean;
}

export const forfeitBonus = async (playerId: string): Promise<IBonusResponse> => {
  const token = getAuthToken();

  const response = await api<IBonusResponse>(`/bonuses/by-id/${playerId}/forfeit`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response) {
    throw new Error('Failed to forfeit bonus');
  }

  return response;
};
