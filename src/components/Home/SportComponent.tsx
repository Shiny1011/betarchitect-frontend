'use client';

import Image from 'next/image';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Team Logos from public assets
const BarcelonaLogo = { src: '/assets/home/featured_card_bg.png' };
const RealMadridLogo = { src: '/assets/home/featured_card_bg.png' };

import { IMAGE } from '@/constants/images';
import { RightArrowIcon, VSHorizontalIcon, VSVerticalIcon } from '@/Icons';

interface Match {
  id: string;
  league: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  status: string;
  score: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  events?: {
    home: number;
    away: number;
  };
}

const mockMatches: Match[] = [
  {
    id: '1',
    league: 'Spain • La Liga',
    homeTeam: {
      name: 'Barcelona',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.BARCELONA,
    },
    awayTeam: {
      name: 'Real Madrid',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.REAL_MADRID,
    },
    status: '1ST HALF 42',
    score: '0:0',
    odds: {
      home: 2.1,
      draw: 3.6,
      away: 2.1,
    },
    events: {
      home: 1,
      away: 2,
    },
  },
  {
    id: '2',
    league: 'Belgium • Pro League',
    homeTeam: {
      name: 'Club Brugge',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.BURGGE_KV,
    },
    awayTeam: {
      name: 'Red Star',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.RED_STAR,
    },
    status: '1ST HALF 43',
    score: '1:0',
    odds: {
      home: 1.85,
      draw: 3.4,
      away: 4.2,
    },
    events: {
      home: 0,
      away: 1,
    },
  },
  {
    id: '3',
    league: 'Spain • La Liga',
    homeTeam: {
      name: 'Atletico Madrid',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.ATLETICO_MADRID,
    },
    awayTeam: {
      name: 'Inter Milan',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.INTER_MILAN,
    },
    status: 'HALF TIME',
    score: '0:0',
    odds: {
      home: 2.45,
      draw: 3.2,
      away: 2.8,
    },
    events: {
      home: 0,
      away: 0,
    },
  },
  {
    id: '4',
    league: 'Italy • Serie A',
    homeTeam: {
      name: 'Atletico Madrid',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.ATLETICO_MADRID,
    },
    awayTeam: {
      name: 'Inter Milan',
      logo: IMAGE.HOME.FOOTBALL_CLUBS.INTER_MILAN,
    },
    status: 'HALF TIME',
    score: '0:0',
    odds: {
      home: 2.3,
      draw: 3.1,
      away: 3.2,
    },
    events: {
      home: 0,
      away: 0,
    },
  },
];

const SportComponent = ({ title }: { title: string }) => {
  return (
    <div className='w-full'>
      {/* Header */}
      <div className='mb-[18px] flex items-center justify-between'>
        <h2 className='leading-full text-[22px] font-bold'>{title}</h2>
        <button
          className='text-lemon-yellow/50 flex cursor-pointer items-center space-x-2 text-sm font-semibold transition-colors'
          onClick={() => {}}
        >
          <span>Live events</span>
          <RightArrowIcon size={14} color='#7C9224' />
        </button>
      </div>

      {/* Matches Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className='w-full'
      >
        {mockMatches.map((match) => (
          <SwiperSlide key={match.id}>
            <div className='bg-dark-indigo flex h-[208px] flex-col rounded-xl p-4 transition-colors duration-200'>
              {/* League */}
              <div className='text-yellow-primary/50 mb-[18px] text-xs font-medium'>{match.league}</div>

              <div className='flex h-full w-full flex-col justify-between'>
                {/* Match Details */}
                <div className='flex h-fit items-start justify-between'>
                  {/* Home Team */}
                  <div className='flex flex-1 flex-col items-center space-y-2'>
                    <div className='flex h-10 w-10 items-center justify-center'>
                      <Image
                        src={match.homeTeam.logo}
                        alt={match.homeTeam.name}
                        width={32}
                        height={32}
                        className='object-cover'
                      />
                    </div>
                    <span className='text-lemon-yellow text-center text-xs font-medium'>{match.homeTeam.name}</span>
                  </div>

                  {/* Score & Status */}
                  <div className='flex flex-1 flex-col items-center space-y-[2px]'>
                    <div className='leading-full text-[10px] font-medium text-red-500'>{match.status}</div>
                    <div className='text-lemon-yellow leading-full text-[17px] font-bold'>{match.score}</div>
                    {/* Events Icons */}
                    <div className='mt-[5px] flex items-center justify-center space-x-1'>
                      <VSVerticalIcon />
                      <VSHorizontalIcon />
                      {/* <div className='h-2 w-2 rounded-full bg-yellow-400'></div> */}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className='flex flex-1 flex-col items-center space-y-2'>
                    <div className='flex h-10 w-10 items-center justify-center'>
                      <Image
                        src={match.awayTeam.logo}
                        alt={match.awayTeam.name}
                        width={32}
                        height={32}
                        className='object-cover'
                      />
                    </div>
                    <span className='text-center text-xs font-medium'>{match.awayTeam.name}</span>
                  </div>
                </div>

                {/* Betting Odds */}
                <div className='flex space-x-2'>
                  <button className='flex-1 rounded-lg bg-[#22355A] p-2 transition-colors duration-200'>
                    <div className='text-lavander text-base font-medium'>{match.odds.home}</div>
                    <div className='text-xs text-white/50'>1</div>
                  </button>
                  <button className='flex-1 rounded-lg bg-[#22355A] p-2 transition-colors duration-200'>
                    <div className='text-lavander text-base font-medium'>{match.odds.draw}</div>
                    <div className='text-xs text-white/50'>X</div>
                  </button>
                  <button className='flex-1 rounded-lg bg-[#22355A] p-2 transition-colors duration-200'>
                    <div className='text-lavander text-base font-medium'>{match.odds.away}</div>
                    <div className='text-xs text-white/50'>2</div>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SportComponent;
