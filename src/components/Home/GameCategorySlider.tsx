'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { LeftArrowIcon, RightArrowIcon, PlayIcon } from '@/Icons';

interface Game {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

interface GameCategorySliderProps {
  title: string;
  games: Game[];
  onViewAllClick?: () => void;
  showLiveBadge?: boolean;
}

export default function GameCategorySlider({
  title,
  games,
  onViewAllClick,
  showLiveBadge = false,
}: GameCategorySliderProps) {
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
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='leading-full text-[22px] font-bold'>{title}</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-normal transition-colors'
          onClick={handleViewAll}
        >
          <span>All</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      <div className='relative'>
        <div
          ref={trackRef}
          className='hide-scrollbar flex w-full snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth sm:gap-4 md:gap-4 lg:gap-5'
        >
          {games.map((game) => (
            <div
              key={game.id}
              className='group bg-dark-indigo relative w-[180px] flex-none cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-200 hover:shadow-lg sm:w-[200px] md:w-[220px]'
            >
              <div className='relative aspect-[3/4] h-[140px] w-full overflow-hidden md:h-[200px]'>
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  className='w-full object-cover transition-transform duration-200 group-hover:scale-105'
                  priority={true}
                  draggable={false}
                />

                {/* Hover overlay */}
                <div className='absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/40' />

                {/* Hover icon */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                  <PlayIcon size={40} color='#E0FE08' />
                </div>

                {/* <div className='absolute bottom-2 left-2 flex h-5 flex-col space-y-1'>
                  {game.isNew && (
                    <span className='bg-lemon-yellow text-blue-indigo h-[23px] rounded-[7px] px-1 text-[14px] font-bold'>
                      New
                    </span>
                  )}
                </div> */}

                {showLiveBadge && (
                  <div className='absolute top-2 right-2'>
                    <div className='h-3 w-3 animate-pulse rounded-full bg-red-500'></div>
                  </div>
                )}
              </div>

              <div className='px-[14px] py-[7.5px]'>
                <h3 className='text-lemon-yellow truncate text-[20px] leading-tight capitalize'>{game.name}</h3>
                <p className='text-lemon-yellow/50 truncate text-[17px] leading-tight'>{game.provider}</p>
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
