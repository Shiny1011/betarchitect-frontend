'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LeftArrowIcon, RightArrowIcon } from '@/Icons';

interface Game {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

interface GameCardProps {
  title: string;
  games: Game[];
  onViewAllClick?: () => void;
  showLiveBadge?: boolean;
}

export default function GameCard({ title, games, onViewAllClick, showLiveBadge = false }: GameCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.floor(el.clientWidth * 0.8);
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    // Allow small threshold for floating point rounding
    const threshold = 1;
    setCanScrollLeft(left > threshold);
    setCanScrollRight(left < maxScrollLeft - threshold);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Initial state
    updateScrollState();
    const onScroll = () => updateScrollState();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  return (
    <div className='w-full'>
      <div className='mb-[16px] flex items-center justify-between'>
        <div className='leading-full text-[20px] font-semibold'>{title}</div>
      </div>

      <div className='relative'>
        <div
          ref={trackRef}
          className='hide-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth sm:gap-4 md:gap-4 lg:gap-5'
        >
          {games.map((game) => (
            <div
              key={game.id}
              className='group bg-dark-indigo relative w-[127px] flex-none cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-200 hover:shadow-lg'
            >
              <div className='relative h-[170px] w-full'>
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className='w-full object-cover transition-transform duration-200 group-hover:scale-105'
                  priority={true}
                  draggable={false}
                />

                <div className='absolute bottom-2 left-2 flex h-5 flex-col space-y-1'>
                  {showLiveBadge && game.isLive && (
                    <span className='animate-pulse rounded-[6px] bg-red-500 px-2 py-1 text-xs font-bold text-white'>
                      Live
                    </span>
                  )}
                  {game.isNew && (
                    <span className='bg-lemon-yellow text-blue-indigo h-[23px] rounded-[7px] px-1 text-[14px] font-bold'>
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

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
          className={`hover:bg-lemon-yellow/20 absolute top-1/2 left-[0px] z-10 -translate-y-1/2 rounded-full border-none bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 ${
            canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
          } cursor-pointer`}
          aria-label='Previous'
        >
          <LeftArrowIcon size={19} />
        </button>
        <button
          onClick={() => scrollByAmount('right')}
          className={`hover:bg-lemon-yellow/20 absolute top-1/2 right-[0px] z-10 -translate-y-1/2 rounded-full border-none bg-black/20 p-2 backdrop-blur-sm transition-all duration-300 ${
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
