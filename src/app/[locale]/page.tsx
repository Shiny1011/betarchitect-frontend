import FeaturedGamesSlider from '@/components/Home/FeaturedGamesSlider';
import GameSections from '@/components/Home/GameSections';
import HeroBanner from '@/components/Home/HeroBanner';
import LiveCasinoSlider from '@/components/Home/LiveCasinoSlider';
import RecentWinsCarousel from '@/components/Home/RecentWinsCarousel';
import SlotsGrid from '@/components/Home/SlotsGrid';
import SportComponent from '@/components/Home/SportComponent';
import TournamentSection from '@/components/Home/TournamentSection';
import WinTable from '@/components/Home/WinTable';
import { IMAGE } from '@/constants/images';

export default function Home() {
  return (
    <div className='space-y-12'>
      {/* Home Page Banner */}
      <HeroBanner />

      {/* Recent Wins Carousel (below HeroBanner) */}
      <section className='w-full max-md:hidden'>
        <RecentWinsCarousel />
      </section>

      {/* Featured Games Slider */}
      <section className='w-full'>
        <FeaturedGamesSlider />
      </section>

      {/* Boosted Odds */}
      <section className='w-full'>
        <SportComponent title='Boosted Odds' />
      </section>

      {/* Game Sections */}
      <section className='w-full'>
        <GameSections />
      </section>

      {/* Tournament Section */}
      <section className='w-full'>
        <TournamentSection />
      </section>

      {/* Live Odds */}
      <section className='w-full'>
        <SportComponent title='Live Now' />
      </section>

      {/* Jackpot Banner */}
      <section className='w-full'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='h-full w-full object-cover'
          width={100}
          height={100}
          src={IMAGE.HOME.JACKPOT}
          alt='Jackpot Banner'
        />
      </section>

      {/* Live Casino */}
      <section className='w-full'>
        <LiveCasinoSlider />
      </section>

      {/* Slot Games */}
      <section className='w-full'>
        <SlotsGrid />
      </section>

      {/* Win Table */}
      <section className='w-full'>
        <WinTable />
      </section>
    </div>
  );
}
