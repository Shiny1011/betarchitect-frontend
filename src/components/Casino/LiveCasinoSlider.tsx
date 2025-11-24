'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LeftArrowIcon, RightArrowIcon, PlayIcon } from '@/Icons';

// Import Game Image
// Using public assets path since local '@/assets' does not exist

export interface LiveCasinoGame {
  id: string;
  name: string;
  imageUrl: string;
  bannerColor: string;
  isLive?: boolean;
}

interface LiveCasinoSliderProps {
  onViewAllClick?: () => void;
}

export const mockLiveCasinoGames: LiveCasinoGame[] = [
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
  {
    id: '7',
    name: 'Lightning Roulette Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-yellow-600',
    isLive: true,
  },
  {
    id: '8',
    name: 'Mega Wheel Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-purple-600',
    isLive: true,
  },
  {
    id: '9',
    name: "Gonzo's Treasure Hunt Live",
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '10',
    name: 'Blackjack Party Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '11',
    name: 'Baccarat Squeeze Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '12',
    name: 'Monopoly Big Baller Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '13',
    name: 'Roulette Azure Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-yellow-600',
    isLive: true,
  },
  {
    id: '14',
    name: 'Crazy Coin Flip Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-purple-600',
    isLive: true,
  },
  {
    id: '15',
    name: 'Dream Catcher Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '16',
    name: 'Power Blackjack Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '17',
    name: 'Golden Wealth Baccarat Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '18',
    name: 'Football Studio Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '19',
    name: 'Immersive Roulette Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-yellow-600',
    isLive: true,
  },
  {
    id: '20',
    name: 'Side Bet City Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-purple-600',
    isLive: true,
  },
  {
    id: '21',
    name: 'Mega Ball Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '22',
    name: 'Free Bet Blackjack Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '23',
    name: 'Speed Baccarat Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '24',
    name: 'Cash or Crash Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '25',
    name: 'Auto Roulette Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-yellow-600',
    isLive: true,
  },
  {
    id: '26',
    name: 'Crazy Time VIP Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-purple-600',
    isLive: true,
  },
  {
    id: '27',
    name: 'Treasure Island Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '28',
    name: 'VIP Blackjack Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '29',
    name: 'Baccarat No Commission Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '30',
    name: 'Dice Duel Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
  {
    id: '31',
    name: 'Roulette Royal Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/1.png',
    bannerColor: 'bg-yellow-600',
    isLive: true,
  },
  {
    id: '32',
    name: 'Wheel of Fortune Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/2.png',
    bannerColor: 'bg-purple-600',
    isLive: true,
  },
  {
    id: '33',
    name: 'Adventure Hunt Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/3.png',
    bannerColor: 'bg-orange-600',
    isLive: true,
  },
  {
    id: '34',
    name: 'Classic Blackjack Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/4.png',
    bannerColor: 'bg-blue-600',
    isLive: true,
  },
  {
    id: '35',
    name: 'Punto Banco Baccarat Live',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/5.png',
    bannerColor: 'bg-green-600',
    isLive: true,
  },
  {
    id: '36',
    name: 'Live Showdown',
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/live-casino/6.png',
    bannerColor: 'bg-red-600',
    isLive: true,
  },
];

export default function LiveCasinoSlider({ onViewAllClick }: LiveCasinoSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < max - 1);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const cardWidth = card?.clientWidth ?? 260;
    const gap = 16;
    const amount = cardWidth + gap;
    el.scrollBy({ left: dir === 'left' ? -(amount * 2) : amount * 2, behavior: 'smooth' });
  };

  const handleViewAll = () => {
    // const el = trackRef.current;
    // if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    if (onViewAllClick) onViewAllClick();
  };

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold md:text-2xl'>Live Casino</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-semibold transition-colors'
          onClick={handleViewAll}
        >
          <span>All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      <div className='relative'>
        <div ref={trackRef} className='hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-1'>
          {mockLiveCasinoGames.map((game) => (
            <div
              key={game.id}
              data-card
              className='group relative w-[200px] flex-none overflow-hidden rounded-xl bg-[#232b3b] shadow-lg transition-all duration-300 hover:shadow-xl md:w-[200px]'
            >
              {/* Game Image Container */}
              <div className='relative h-[284px]'>
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                  fill
                  priority={true}
                  draggable={false}
                />

                {/* Play Button Overlay - Show on hover */}
                <div className='absolute inset-0 flex items-center justify-center bg-[#00000080] opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <button className='bg-yellow-primary hover:bg-yellow-primary/90 flex h-[86px] w-[86px] transform items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110'>
                    <PlayIcon size={56} color='#E0FE08' className='ml-1 text-black' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge Gradient Overlays */}
        <div
          className={`pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        <button
          onClick={() => scrollByAmount('left')}
          className={`hover:bg-lemon-yellow/20 absolute top-1/2 left-[18px] z-10 -translate-y-1/2 rounded-full border-none bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 ${
            canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
          } cursor-pointer`}
          aria-label='Previous'
        >
          <LeftArrowIcon size={19} />
        </button>
        <button
          onClick={() => scrollByAmount('right')}
          className={`hover:bg-lemon-yellow/20 absolute top-1/2 right-[18px] z-10 -translate-y-1/2 rounded-full border-none bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 ${
            canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'
          } cursor-pointer`}
          aria-label='Next'
        >
          <RightArrowIcon size={19} />
        </button>
      </div>
    </div>
  );
}
