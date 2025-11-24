'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { mockLiveCasinoGames } from '@/components/Casino/LiveCasinoSlider';
import { BGamingIcon, EvolutionIcon, LeftArrowIcon, NetEntIcon, PragmaticPlayIcon, RelaGamingIcon } from '@/Icons';

type Filter = 'featured' | 'popular' | 'new' | 'az';

export default function ProvidersPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('az');
  const [activeFilter, setActiveFilter] = useState<Filter>('az');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const providers = [
    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },

    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },

    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },

    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },

    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },

    { Icon: PragmaticPlayIcon, name: 'pragmatic' },
    { Icon: EvolutionIcon, name: 'evolution' },
    { Icon: BGamingIcon, name: 'bgaming' },
    { Icon: NetEntIcon, name: 'netent' },
    { Icon: RelaGamingIcon, name: 'relagaming' },
  ];

  const playingCountFor = (id: string) => {
    const n = parseInt(id, 10);
    if (Number.isNaN(n)) return 10;
    return ((n * 7) % 50) + 5; // 5..54
  };

  const filteredGames = useMemo(() => {
    const base = [...mockLiveCasinoGames];
    switch (activeFilter) {
      case 'popular':
        return base.reverse();
      case 'new':
        return base.filter((g) => g.isLive);
      case 'az':
      default:
        return base.sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [activeFilter]);

  // Clamp visible count when filter changes
  useEffect(() => {
    setVisibleCount((v) => Math.min(Math.max(v, 12), mockLiveCasinoGames.length));
  }, [activeFilter]);

  const pills: { key: Filter; label: string }[] = [
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
            <h1 className='text-lemon-yellow text-[22px] font-bold'>Providers</h1>
            <p className='text-lemon-yellow/50 text-[14px]'>{filteredGames.length} providers</p>
          </div>
        </div>

        <div className='flex flex-wrap gap-3'>
          {pills.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
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

      <div className='grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-5'>
        {providers.map(({ Icon, name }, index) => (
          <div
            key={index}
            className='bg-dark-indigo flex w-full flex-col items-center justify-center gap-[15px] rounded-[20px] p-6 transition-all hover:bg-[#00102E] active:bg-[#00102E]'
          >
            <Icon className='h-[68px] w-[154px]' />
            <div
              className='bg-lemon-yellow/50 text-lemon-yellow hover:bg-lemon-yellow/60 cursor-pointer rounded-full px-[10px] py-[5px] text-xs transition-all duration-300'
              onClick={() => router.push(`/casino/providers/${name}`)}
            >
              150 Games
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
