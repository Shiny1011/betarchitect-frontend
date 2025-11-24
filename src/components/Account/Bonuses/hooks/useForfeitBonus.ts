import { useMutation } from '@tanstack/react-query';

import { forfeitBonus } from '../api/forfeitBonus';

export const useForfeitBonus = () => {
  return useMutation({
    mutationKey: ['forfeit'],
    mutationFn: async (playerId: string) => await forfeitBonus(playerId),
  });
};
