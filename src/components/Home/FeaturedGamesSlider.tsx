'use client';

import Image from 'next/image';

import { IMAGE } from '@/constants/images';
import { RightArrowIcon } from '@/Icons';
import { Game } from '@/lib/schema';

interface FeaturedGamesSliderProps {
  games?: Game[];
  onViewAllClick?: () => void;
}

const featuredGames: Game[] = [
  {
    id: '1',
    name: 'Lucky Slots',
    description: 'Classic slot game with amazing prizes',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Slots',
    isActive: true,
    minBet: 0.25,
    maxBet: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Blackjack Pro',
    description: 'Professional blackjack experience',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Blackjack',
    isActive: true,
    minBet: 1,
    maxBet: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Roulette Royale',
    description: 'European roulette with live dealers',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Roulette',
    isActive: true,
    minBet: 0.5,
    maxBet: 1000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Lucky Slots',
    description: 'Classic slot game with amazing prizes',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Slots',
    isActive: true,
    minBet: 0.25,
    maxBet: 100,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Blackjack Pro',
    description: 'Professional blackjack experience',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Blackjack',
    isActive: true,
    minBet: 1,
    maxBet: 500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Roulette Royale',
    description: 'European roulette with live dealers',
    imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
    category: 'Roulette',
    isActive: true,
    minBet: 0.5,
    maxBet: 1000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // {
  //   id: '7',
  //   name: 'Roulette Royale',
  //   description: 'European roulette with live dealers',
  //   imageUrl: IMAGE.HOME.FEATURED_CARD_BG,
  //   category: 'Roulette',
  //   isActive: true,
  //   minBet: 0.5,
  //   maxBet: 1000,
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // },
];

export default function FeaturedGamesSlider({ games, onViewAllClick }: FeaturedGamesSliderProps) {
  const items = games ?? featuredGames;

  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className='w-full'>
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='leading-full text-[22px] font-bold'>Featured Games</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-normal transition-colors'
          onClick={handleViewAll}
        >
          <span>All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      <div className='grid grid-cols-3 gap-[28px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        {items.map((game) => (
          <div
            key={game.id}
            className='group relative w-full cursor-pointer rounded-[8px] transition-shadow duration-200'
          >
            <img
              src={game.imageUrl}
              alt={game.name}
              className='h-full w-full rounded-[8px] object-cover'
              draggable={false}
            />
            <Image
              src={IMAGE.HOME.FIREPIG}
              alt='Firepig'
              width={150}
              height={150}
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
