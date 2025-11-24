'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { mockLiveCasinoGames } from '@/components/Casino/LiveCasinoSlider';
import { LeftArrowIcon } from '@/Icons';

type Filter = 'featured' | 'popular' | 'new' | 'az';

export default function LiveCasinoPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<Filter>('az');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prevColsRef = useRef<number>(0);

  const playingCountFor = (id: string) => {
    const n = parseInt(id, 10);
    if (Number.isNaN(n)) return 10;
    return ((n * 7) % 50) + 5; // 5..54
  };

  const filteredGames = useMemo(() => {
    const base = [...mockLiveCasinoGames.slice(0, 20)];
    switch (activeFilter) {
      case 'featured':
        return base.slice(0, 6);
      case 'popular':
        return base.reverse();
      case 'new':
        return base.filter((g) => g.isLive);
      case 'az':
      default:
        return base.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [activeFilter]);

  // Increase visible items by +6 when grid width allows more columns
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const gap = 16; // Tailwind gap-4
    const cardWidth = 200; // fixed card width
    const measure = () => {
      const width = el.clientWidth;
      const cols = Math.max(1, Math.floor((width + gap) / (cardWidth + gap)));
      if (cols > prevColsRef.current) {
        setVisibleCount((v) => Math.min(v + 6, mockLiveCasinoGames.length));
      }
      prevColsRef.current = cols;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Clamp visible count when filter changes
  useEffect(() => {
    setVisibleCount((v) => Math.min(Math.max(v, 12), mockLiveCasinoGames.length));
  }, [activeFilter]);

  const pills: { key: Filter; label: string }[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'popular', label: 'Popular' },
    { key: 'new', label: 'New' },
    { key: 'az', label: 'A-Z' },
  ];

  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-12'>
        <div className='flex items-center gap-6'>
          <button
            aria-label='Back'
            onClick={() => router.push('/casino')}
            className='hover:bg-lemon-yellow/10 bg-dark-indigo h-12 w-12 cursor-pointer rounded-full p-2'
          >
            <LeftArrowIcon size={18} opacity={0.5} />
          </button>
          <div>
            <h1 className='text-lemon-yellow text-[22px] font-bold'>Live casino</h1>
            <p className='text-lemon-yellow/50 text-[14px]'>{filteredGames.length} games</p>
          </div>
        </div>

        <div className='flex flex-wrap gap-3'>
          {pills.map(({ key, label }) => {
            const active = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex h-10 cursor-pointer items-center justify-center ${
                  active
                    ? 'bg-lemon-yellow text-blue-indigo'
                    : 'text-lemon-yellow/50 bg-dark-indigo hover:bg-dark-indigo/50'
                } rounded-full px-6 text-base font-medium transition-colors`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className='grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-8'
      >
        {filteredGames.slice(0, visibleCount).map((game) => (
          <div key={game.id} className='group w-full overflow-hidden rounded-xl'>
            <div className='relative w-full overflow-hidden rounded-xl'>
              <img
                src={game.imageUrl}
                alt={game.name}
                className='overflow-hidden object-cover transition-transform duration-300 group-hover:scale-105'
                draggable={false}
              />
            </div>
            <div className='mt-1 p-[6px]'>
              <div className='text-lavander flex items-center gap-2 text-[13px] font-semibold'>
                <span className='bg-lemon-yellow h-2 w-2 rounded-full'></span>
                <span className='leading-full text-sm font-semibold'>{playingCountFor(game.id)} playing</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
