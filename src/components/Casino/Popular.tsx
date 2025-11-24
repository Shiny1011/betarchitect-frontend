'use client';

import { RightArrowIcon } from '@/Icons';
import { Game } from '@/lib/schema';

interface PopularProps {
  games?: Game[];
  onViewAllClick?: () => void;
  title?: string;
}

interface Games {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

const gameItems: Games[] = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
    isLive: false,
  },
];

export default function Popular({ games, onViewAllClick }: PopularProps) {
  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className='w-full'>
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='text-lemon-yellow text-[22px] font-bold'>Popular</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-normal transition-colors'
          onClick={handleViewAll}
        >
          <span>View All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      <div className='grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5'>
        {gameItems.map((game) => (
          <div
            key={game.id}
            className='group bg-dark-indigo relative max-h-[270px] w-full cursor-pointer overflow-hidden rounded-xl shadow-md transition-shadow duration-200 hover:shadow-lg'
          >
            <div className='relative aspect-4/5'>
              <img
                src={game.imageUrl}
                alt={game.name}
                className='w-full rounded-t-[8px] object-cover object-top'
                draggable={false}
              />

              <div className='absolute bottom-2 left-2 flex h-5 flex-col space-y-1'>
                {game.isLive && (
                  <span className='animate-pulse rounded-[6px] bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                    Live
                  </span>
                )}
                {game.isNew && (
                  <span className='bg-yellow-primary text-dark-primary rounded-[6px] px-2 py-1 text-xs font-bold'>
                    New
                  </span>
                )}
              </div>
            </div>

            <div className='bg-dark-indigo absolute bottom-0 left-0 flex h-[60px] w-full items-center justify-start px-3'>
              <h3 className='text-lemon-yellow mb-1 truncate text-lg'>{game.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
