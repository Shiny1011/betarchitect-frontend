import { useMemo } from 'react';

import { Games } from '@/constants';

export function useGameSearch(games: Games[], search: string) {
  const filtered = useMemo(() => {
    if (!search.trim()) return games;
    const q = search.toLowerCase();
    return games.filter((g) => g.name.toLowerCase().includes(q));
  }, [games, search]);

  return filtered;
}
