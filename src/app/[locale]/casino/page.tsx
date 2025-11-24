'use client';

import { useRouter } from 'next/navigation';

import GameCategorySlider from '@/components/Casino/GameCategorySlider';
import HeroBanner from '@/components/Casino/HeroBanner';
import LiveCasinoSlider from '@/components/Casino/LiveCasinoSlider';
import Popular from '@/components/Casino/Popular';
import Provider from '@/components/Casino/Provider';
import RecentWinsCarousel from '@/components/Casino/RecentWinsCarousel';
import SlotsGrid from '@/components/Casino/SlotsGrid';
import WinTable from '@/components/Casino/WinTable';

const mockGames = [
  {
    id: '1',
    name: 'Coin Strike Hold and Win 3x3',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '2',
    name: 'Banquet of Dead',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '3',
    name: 'Sweet Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '4',
    name: 'Big Bass Bonanza',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/4.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '5',
    name: 'Dragons Playground',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/5.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '6',
    name: "777 Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/6.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '7',
    name: 'Jellycious Doublemax',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '8',
    name: 'Egyptian Darkness Book of the Divine',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/2.png',
    isNew: true,
    isLive: false,
  },
  {
    id: '9',
    name: "Joker's Charms Valentine's",
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/3.png',
    isNew: false,
    isLive: false,
  },
  {
    id: '10',
    name: 'Jelly Belly Megaways',
    provider: 'Provider',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/home/featured-game/game/1.png',
    isNew: true,
    isLive: true,
  },
];

export default function Casino() {
  const router = useRouter();

  return (
    <div>
      {/* Casino Page Banner */}
      <HeroBanner />

      {/* Recent Wins Carousel (below HeroBanner) */}
      <div className='mt-[42px]'>
        <RecentWinsCarousel />
      </div>

      {/* Popular Games Slider */}
      <section className='mt-[42px] w-full'>
        <Popular />
      </section>

      {/* Slot Games */}
      <section className='mt-[42px] w-full'>
        <SlotsGrid />
      </section>

      {/* Provider */}
      <section className='mt-[42px] w-full'>
        <Provider onViewAllClick={() => router.push('/casino/providers')} />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider
          title='Jackpots'
          games={mockGames.slice(0, 7)}
          onViewAllClick={() => router.push('/casino/jackpots')}
        />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Instant win' games={mockGames.slice(0, 7)} />
      </section>

      {/* Win Table */}
      <section className='mt-[42px] w-full'>
        <WinTable />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Bonus games' games={mockGames.slice(0, 7)} />
      </section>

      {/* Live Casino */}
      <section className='mt-[42px] w-full'>
        <LiveCasinoSlider onViewAllClick={() => router.push('/casino/live-casino')} />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Drops and Wins' games={mockGames.slice(0, 7)} />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Crash games' games={mockGames.slice(0, 7)} />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Live Dealer' games={mockGames.slice(0, 7)} />
      </section>

      <section className='mt-[42px] w-full'>
        <GameCategorySlider title='Megaways' games={mockGames.slice(0, 7)} />
      </section>
    </div>
  );
}
