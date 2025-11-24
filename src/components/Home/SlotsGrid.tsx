'use client';

import { RightArrowIcon } from '@/Icons';
import { useIsMobile } from '@/lib/hooks';

interface SlotGame {
  id: string;
  name: string;
  imageUrl: string;
  provider?: string;
  isNew?: boolean;
}

interface SlotsGridProps {
  onViewAllClick?: () => void;
}

const mockSlotGames: SlotGame[] = [
  {
    id: '1',
    name: 'Book of Arabia',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/1.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '2',
    name: 'Firepig',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/2.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '3',
    name: 'Bonsai Dragon Blitz',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/3.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '4',
    name: 'Witch Heart Megaways',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/4.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '5',
    name: 'Fighter Pit',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/5.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '6',
    name: 'Cherry Pop Burst',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/6.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '7',
    name: 'Moon Princess Stargazing',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/5.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '8',
    name: 'Gates of Olympus Super Scatter',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/7.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '9',
    name: 'Book of Arabia',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/8.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '10',
    name: 'Firepig',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/9.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '11',
    name: 'Firepig',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/1.png',
    provider: 'Provider',
    isNew: false,
  },
  {
    id: '12',
    name: 'Firepig',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/2.png',
    provider: 'Provider',
    isNew: false,
  },
];

export default function SlotsGrid({ onViewAllClick }: SlotsGridProps) {
  const isMobile = useIsMobile();

  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  // Show only 6 items on mobile, all items on desktop
  const displayedGames = isMobile ? mockSlotGames.slice(0, 6) : mockSlotGames;

  return (
    <div className='w-full'>
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='leading-full text-[22px] font-bold'>Slots</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-semibold transition-colors'
          onClick={handleViewAll}
        >
          <span>All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      {/* <div className='space-y-4'> */}
      <div className='grid grid-cols-3 gap-[17px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {displayedGames.map((game) => (
          <div
            key={game.id}
            className='group relative w-full cursor-pointer overflow-hidden rounded-xl bg-[#232b3b] shadow-md transition-all duration-200 hover:shadow-lg'
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className='h-full w-full object-cover object-top transition-transform duration-200 group-hover:scale-105'
            />

            <div className='absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20'></div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
