'use client';

import { RightArrowIcon } from '@/Icons';

// Import Game Image
// Using public assets path since local '@/assets' does not exist

interface LiveCasinoGame {
  id: string;
  name: string;
  imageUrl: string;
  bannerColor: string;
  isLive?: boolean;
}

interface LiveCasinoSliderProps {
  onViewAllClick?: () => void;
}

const mockLiveCasinoGames: LiveCasinoGame[] = [
  {
    id: '1',
    name: 'Red Door ROULETTE Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '2',
    name: 'CRAZY TIME Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '3',
    name: "GONZO'S TREASURE MAP Live",
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '4',
    name: 'VIDEO POKER Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '5',
    name: 'CRAZY PACHINKO Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '6',
    name: 'CRAZY TIME Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
];

export default function LiveCasinoSlider({ onViewAllClick }: LiveCasinoSliderProps) {
  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='leading-full text-[22px] font-bold'>Live Casino</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-semibold transition-colors'
          onClick={handleViewAll}
        >
          <span>All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      <div className='grid grid-cols-3 gap-[17px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {mockLiveCasinoGames.map((game) => (
          <div
            key={game.id}
            className='group relative w-full cursor-pointer rounded-[8px] transition-shadow duration-200'
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className='h-full w-full rounded-[8px] object-cover object-top'
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
