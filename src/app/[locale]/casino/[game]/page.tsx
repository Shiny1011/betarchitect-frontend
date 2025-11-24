'use client';

import { useState } from 'react';

import GameCard from '@/components/Game/GameCard';
import GameInfoModal from '@/components/Game/GameInfoModal';
import { LeftArrowIcon, RightArrowIcon } from '@/Icons';
import { InfoIcon, TargetIcon, LayerIcon } from '@/Icons';

export default function CasinoGamePage() {
  const [mode, setMode] = useState<'fun' | 'real'>('real');
  const [infoOpen, setInfoOpen] = useState(false);

  const games = [
    {
      id: '1',
      name: 'Jackpot Blaze',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/1.png',
    },
    {
      id: '2',
      name: 'Ice Mints',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/2.png',
    },
    {
      id: '3',
      name: 'Starlight Wins',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/3.png',
    },
    {
      id: '4',
      name: 'Witch Heart',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/4.png',
    },
    {
      id: '5',
      name: 'Banquet of Dead',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/5.png',
    },
    {
      id: '6',
      name: 'Jackpot Blaze',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/6.png',
    },
    {
      id: '7',
      name: 'Ice Mints',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/7.png',
    },
    {
      id: '8',
      name: 'Witch Heart',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/8.png',
    },
    {
      id: '9',
      name: 'Starlight Wins',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/9.png',
    },
    {
      id: '10',
      name: 'Ice Mints',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/1.png',
    },
    {
      id: '11',
      name: 'Jackpot Blaze',
      provider: 'Provider',
      imageUrl:
        'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/slots/2.png',
    },
  ];

  return (
    <div className='w-full'>
      {/* Breadcrumb / Title */}
      <div className='mb-12 pt-3 text-[22px] font-bold'>
        Pragmatic Play &gt; <span className='text-[22px] font-medium'>Big Bass</span>
      </div>

      {/* Player Container */}
      <div className='bg-dark-indigo relative h-[633px] w-full rounded-xl'></div>

      {/* Control Bar */}
      <div className='mt-[14px] flex items-center justify-between'>
        <button className='cursor-pointer' aria-label='Previous'>
          <LeftArrowIcon size={16} />
        </button>
        <div className='bg-dark-indigo flex items-center gap-[64px] space-x-3 rounded-[8px] px-3 py-[8.5px]'>
          <div className='flex items-center gap-3'>
            <TargetIcon opacity={0.5} />
            <LayerIcon opacity={0.5} />
            <button aria-label='Game info' onClick={() => setInfoOpen(true)} className='cursor-pointer'>
              <InfoIcon size={18} opacity={0.5} />
            </button>
          </div>

          <div className='flex items-center space-x-2 text-sm'>
            <button
              className={`text-[18px] font-medium transition-colors ${
                mode === 'fun' ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
              }`}
            >
              Fun Play
            </button>
            <input
              className="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary bg-lavander/30 after:bg-lavander mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:ring-0 focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type='checkbox'
              role='switch'
              onChange={(e) => setMode(e.target.checked ? 'real' : 'fun')}
            />
            <button
              className={`text-[18px] font-medium transition-colors ${
                mode === 'real' ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
              }`}
            >
              Real Play
            </button>
          </div>
        </div>
        <button className='cursor-pointer' aria-label='Next'>
          <RightArrowIcon size={16} />
        </button>
      </div>

      {/* Sections */}
      <div className='mt-[42px] space-y-6'>
        <section className='bg-dark-indigo rounded-xl p-6'>
          <GameCard title='Featured' games={games} onViewAllClick={() => {}} />
        </section>
        <section className='bg-dark-indigo rounded-xl p-6'>
          <GameCard title='More Like This' games={games} onViewAllClick={() => {}} />
        </section>
        <section className='bg-dark-indigo rounded-xl p-6'>
          <GameCard title='More by Pragmatic Play' games={games} onViewAllClick={() => {}} />
        </section>
      </div>

      {/* Game Info Modal */}
      <GameInfoModal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        game={{
          name: 'Sweet Bonanza 1000',
          provider: 'Pragmatic Play',
          imageUrl:
            'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
          rtpLow: 96.48,
          rtpHigh: 96.52,
          volatility: 'medium-high',
          paylines: '6 x 5',
          betMin: 0.2,
          betMax: 100,
        }}
      />
    </div>
  );
}
