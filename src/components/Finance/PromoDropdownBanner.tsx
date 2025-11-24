'use client';

import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { IMAGE } from '@/constants/images';
import { LeftArrowIcon } from '@/Icons';

interface PromoDropdownBannerProps {
  open: boolean;
  onToggle: () => void;
  selectedPromo: string;
  promos: string[];
  onSelect: (p: string) => void;
  className?: string;
}

export default function PromoDropdownBanner({
  open,
  onToggle,
  selectedPromo,
  promos,
  onSelect,
  className,
}: PromoDropdownBannerProps) {
  return (
    <div className={className}>
      {/* Outer wrapper holds the glow, not clipped by overflow-hidden */}
      <div
        className={`relative rounded-2xl ${
          open ? 'shadow-[0_0_20px_rgba(224,254,8,0.5),0_0_40px_rgba(224,254,8,0.35)]' : ''
        } transition-shadow duration-300`}
      >
        {/* Inner container with actual border and background */}
        <div
          className={`relative overflow-hidden rounded-2xl border ${open ? 'border-transparent' : 'border-[#22355A]'} `}
          style={{
            backgroundImage: `url(${IMAGE.AUTH.DROPDOWN_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className='pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10' />

          <button
            type='button'
            onClick={onToggle}
            className='relative z-10 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left'
            aria-expanded={open}
          >
            <span className='text-[16px] font-bold text-[#0F1B33] drop-shadow-[0_1px_0_rgba(255,255,255,0.3)]'>
              {selectedPromo}
            </span>
            <span className='grid h-6 w-6 place-items-center rounded-full bg-white/70 text-[#0F1B33]'>
              <LeftArrowIcon
                className={`${open ? 'rotate-90' : '-rotate-90'} transition-all duration-300`}
                size={10}
                color='#22355A'
              />
            </span>
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className='relative z-10 pb-3'
              >
                <div className='space-y-2'>
                  {promos.map((p) => {
                    const active = selectedPromo === p;
                    return (
                      <button
                        key={p}
                        type='button'
                        onClick={() => onSelect(p)}
                        className={`flex w-full items-center justify-start gap-3 px-6 py-3 transition-colors ${
                          active ? 'bg-white/60' : ''
                        }`}
                      >
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full border ${
                            active ? 'border-[#0F1B33] bg-[#0F1B33]' : 'border-[#0F1B33] bg-transparent'
                          }`}
                        >
                          {active && <span className='h-2 w-2 rounded-full bg-white' />}
                        </span>
                        <span
                          className={`text-[15px] font-semibold text-[#0F1B33] ${active ? 'opacity-100' : 'opacity-80'}`}
                        >
                          {p}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
