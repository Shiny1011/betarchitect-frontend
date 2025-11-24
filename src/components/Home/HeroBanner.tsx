'use client';

import { useEffect, useRef, useState } from 'react';

import { IMAGE } from '@/constants/images';
import { LeftArrowIcon, RightArrowIcon } from '@/Icons';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl: string;
}

const slides: Slide[] = [
  {
    id: 'gold-spin',
    title: 'GOLD SPIN CUP',
    subtitle: 'TOURNAMENT',
    ctaText: 'JOIN NOW',
    ctaHref: '#',
    imageUrl: IMAGE.HOME.JACKPOT,
  },
  {
    id: 'crazy-time',
    title: 'CRAZY TIME LIVE',
    subtitle: 'CASINO',
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    imageUrl: IMAGE.HOME.JACKPOT,
  },
  {
    id: 'roulette',
    title: 'RED DOOR ROULETTE',
    subtitle: 'LIVE',
    ctaText: 'PLAY NOW',
    ctaHref: '#',
    imageUrl: IMAGE.HOME.JACKPOT,
  },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [hovering]);

  return (
    <div
      ref={containerRef}
      className='relative w-full overflow-hidden rounded-2xl bg-[#0f192b]'
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className='flex w-full'
        style={{ transform: `translateX(-${index * 100}%)`, transition: 'transform 400ms ease-in-out' }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className='relative w-full flex-none'>
            <div className='relative h-[320px] w-full md:h-[420px]'>
              {/* <Image
                src={slide.imageUrl}
                alt={slide.title}
                fill
                className='object-cover'
                priority={true}
                draggable={false}
              /> */}
            </div>

            {/* Content overlay */}
            <div className='absolute bottom-6 left-6'>
              {slide.subtitle && <div className='text-lavander mb-1 text-[11px]'>{slide.subtitle}</div>}
              <div className='text-lemon-yellow leading-full mb-4 text-[32px] font-bold'>{slide.title}</div>
              {slide.ctaText && (
                <a
                  href={slide.ctaHref}
                  className='bg-lavander text-blue-indigo inline-block rounded-md px-4 py-2 text-sm font-semibold'
                >
                  {slide.ctaText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Nav buttons */}
      <button
        onClick={prev}
        className='hover:bg-yellow-primary/20 absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors'
        aria-label='Previous'
      >
        <LeftArrowIcon size={20} />
      </button>
      <button
        onClick={next}
        className='hover:bg-yellow-primary/20 absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors'
        aria-label='Next'
      >
        <RightArrowIcon size={20} />
      </button>
    </div>
  );
}
