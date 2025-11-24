'use client';

import { useEffect, useRef, useState } from 'react';

interface Slide {
  id: string;
}

// Create 6 minimal slides to match the indicator design
const slides: Slide[] = [
  { id: 'slide-1' },
  { id: 'slide-2' },
  { id: 'slide-3' },
  { id: 'slide-4' },
  { id: 'slide-5' },
  { id: 'slide-6' },
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
    <div className='relative'>
      <div
        ref={containerRef}
        className='bg-dark-indigo relative w-full overflow-hidden rounded-2xl'
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Slides */}
        <div
          className='flex h-[376px] w-full'
          style={{ transform: `translateX(-${index * 100}%)`, transition: 'transform 400ms ease-in-out' }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className='relative w-full flex-none'>
              {/* Banner content (no background image) */}
              <div className='relative h-full w-full'>
                {/* Left-aligned content */}
                <div className='absolute bottom-[44px] left-10'>
                  <div className='text-lemon-yellow text-[20px] uppercase'>SIGN UP AND GET REWARD UP TO</div>
                  <div className='text-lemon-yellow text-[32px] font-semibold'>$ 20.000 AND 100FS</div>
                  <button
                    className='bg-lavander text-dark-indigo mt-6 inline-block h-[35px] w-[157px] rounded-[4px] px-4 py-2 text-sm font-semibold transition-colors'
                    onClick={() => {}}
                  >
                    CLAIM BONUS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination dots */}
      <div className='mt-3 flex w-full items-center justify-center gap-2'>
        {slides.map((_, i) => (
          <button
            key={`dot-${i}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`rounded-full transition-all ${index === i ? 'bg-lavander h-2 w-2' : 'bg-dark-indigo h-2 w-2'}`}
          />
        ))}
      </div>
    </div>
  );
}
