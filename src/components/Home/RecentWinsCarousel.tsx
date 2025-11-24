'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import Marquee from 'react-fast-marquee';

import { LeftArrowIcon, RightArrowIcon } from '@/Icons';

interface WinItem {
  id: string;
  gameTitle: string;
  player: string;
  payout: number;
  imageUrl: string;
}

const mockWins: WinItem[] = [
  {
    id: 'w1',
    gameTitle: 'Blackjack Classic 67',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/1.png',
  },
  {
    id: 'w2',
    gameTitle: 'Aztec Pyramid',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/2.png',
  },
  {
    id: 'w3',
    gameTitle: 'Mustang Gold',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/3.png',
  },
  {
    id: 'w4',
    gameTitle: 'Mega Joker',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/4.png',
  },
  {
    id: 'w5',
    gameTitle: 'Dead or Alive',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/5.png',
  },
  {
    id: 'w6',
    gameTitle: 'Live Casino',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/1.png',
  },
  {
    id: 'w7',
    gameTitle: 'Live Casino',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/2.png',
  },
  {
    id: 'w8',
    gameTitle: 'Live Casino',
    player: 'Bambino7',
    payout: 8_500,
    imageUrl:
      'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/hero-win/3.png',
  },
];

export default function RecentWinsCarousel() {
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

  return (
    <section className='w-full'>
      <div className='relative'>
        {/* Track */}
        <Marquee>
          <div className='no-scrollbar hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-1'>
            {mockWins.map((win) => (
              <div
                key={win.id}
                data-card
                className='bg-dark-indigo flex w-[260px] flex-none items-center gap-3 rounded-2xl p-3 shadow-md'
              >
                <div className='relative h-14 w-14 overflow-hidden rounded-lg'>
                  <Image
                    src={win.imageUrl}
                    alt={win.gameTitle}
                    fill
                    className='object-cover'
                    draggable={false}
                    sizes='56px'
                  />
                </div>
                <div className='flex min-w-0 flex-col'>
                  <div className='text-lavander truncate text-sm font-semibold'>{win.gameTitle}</div>
                  <div className='text-lavander/60 truncate text-xs'>{win.player}</div>
                  <div className='mt-1 text-sm font-extrabold'>{win.payout.toLocaleString()}$</div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>

        {/* Edge Gradients */}
        <div
          className={`pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div
          className={`pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        {/* Nav Buttons */}
        <button
          onClick={() => scrollByAmount('left')}
          className={`hover:bg-yellow-primary/20 absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 ${
            canScrollLeft ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label='Previous'
        >
          <LeftArrowIcon size={18} />
        </button>
        <button
          onClick={() => scrollByAmount('right')}
          className={`hover:bg-yellow-primary/20 absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-all duration-300 ${
            canScrollRight ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-label='Next'
        >
          <RightArrowIcon size={18} />
        </button>
      </div>
    </section>
  );
}
