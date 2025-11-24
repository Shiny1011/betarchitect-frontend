'use client';

import { useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LeftArrowIcon } from '@/Icons';

interface Game {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
}

const mockJackpotGames: Game[] = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: false,
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
  {
    id: '6',
    name: "777 Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/6.png',
    isNew: false,
  },
  {
    id: '7',
    name: 'Jellycious Doublemax',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
  },
  {
    id: '8',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: true,
  },
  {
    id: '9',
    name: "Joker's Charms Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: false,
  },
  {
    id: '10',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: true,
  },
  {
    id: '11',
    name: 'Mystic Magic',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
  },
  {
    id: '12',
    name: 'Dragons Playground 2',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
  {
    id: '13',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
  },
  {
    id: '14',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: false,
  },
  {
    id: '15',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
  },
  {
    id: '16',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
  },
  {
    id: '17',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
  {
    id: '18',
    name: "777 Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/6.png',
    isNew: false,
  },
  {
    id: '19',
    name: 'Jellycious Doublemax',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
  },
  {
    id: '20',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: true,
  },
  {
    id: '21',
    name: "Joker's Charms Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: false,
  },
  {
    id: '22',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: true,
  },
  {
    id: '23',
    name: 'Mystic Magic',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
  },
  {
    id: '24',
    name: 'Dragons Playground 2',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
  {
    id: '25',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: true,
  },
  {
    id: '26',
    name: "Joker's Charms Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: false,
  },
  {
    id: '27',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: true,
  },
  {
    id: '28',
    name: 'Mystic Magic',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
  },
  {
    id: '29',
    name: 'Dragons Playground 2',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
  {
    id: '30',
    name: 'Dragons Playground 2',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
  },
];

type Filter = 'featured' | 'popular' | 'new' | 'az';

export default function JackpotsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('az');

  // Reorder array to avoid consecutive duplicates by a given key
  const avoidConsecutiveDuplicates = <T,>(list: T[], key: (x: T) => string) => {
    const pool = [...list];
    const result: T[] = [];
    while (pool.length) {
      const lastKey = result.length ? key(result[result.length - 1]) : '';
      let idx = pool.findIndex((item) => key(item) !== lastKey);
      if (idx === -1) idx = 0;
      result.push(pool.splice(idx, 1)[0]);
    }
    return result;
  };

  const games = useMemo(() => {
    const byImageKey = (g: Game) => g.imageUrl;
    let arr = [...mockJackpotGames];
    switch (filter) {
      case 'new':
        arr = arr.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || a.name.localeCompare(b.name));
        break;
      case 'az':
        arr = arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      case 'featured':
      default:
        break;
    }
    return avoidConsecutiveDuplicates(arr, byImageKey);
  }, [filter]);

  const pills: { key: Filter; label: string }[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'popular', label: 'Popular' },
    { key: 'new', label: 'New' },
    { key: 'az', label: 'A-Z' },
  ];

  return (
    <div className='space-y-12'>
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
            <h1 className='text-lemon-yellow text-[22px] font-bold'>Jackpots</h1>
            <p className='text-lemon-yellow/50 text-[14px]'>{games.length} games</p>
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

      <div className='grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-8'>
        {games.map((game) => (
          <div
            key={game.id}
            className='group bg-dark-indigo relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-200 hover:shadow-lg'
            onClick={() => router.push(`/casino/${game.id}`)}
          >
            <div className='w-full'>
              <img
                src={game.imageUrl}
                alt={game.name}
                className='w-full object-cover transition-transform duration-200 group-hover:scale-105'
                draggable={false}
              />

              <div className='absolute bottom-2 left-2 flex h-5 flex-col space-y-1'>
                {game.isNew && (
                  <span className='bg-yellow-primary text-dark-primary rounded-[6px] px-2 py-1 text-xs font-bold'>
                    New
                  </span>
                )}
              </div>
            </div>
            <div className='px-3 py-2'>
              <h3 className='mb-1 truncate text-lg font-semibold'>{game.name}</h3>
              <p className='text-yellow-primary/50 truncate text-sm'>{game.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
