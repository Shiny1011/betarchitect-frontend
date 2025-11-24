'use client';

import { useState } from 'react';

import { Button } from '@/components/shared';
import { useIsMobile } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface BetData {
  id: string;
  game: {
    name: string;
    icon: string;
  };
  player: string;
  time: string;
  bet: number;
  multiplier: number;
  payout: number;
}

interface WinTableProps {
  onViewAllClick?: () => void;
}

const mockBetData: BetData[] = [
  {
    id: '1',
    game: { name: 'Game Name', icon: '🎰' },
    player: 'Nunito123',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '2',
    game: { name: 'Game Name', icon: '💰' },
    player: 'Lol56',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '3',
    game: { name: 'Game Name', icon: '🐉' },
    player: 'All_fg',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '4',
    game: { name: 'Game Name', icon: '🍒' },
    player: 'SadSad666',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '5',
    game: { name: 'Game Name', icon: '🪙' },
    player: 'Big Dann',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '6',
    game: { name: 'Game Name', icon: '📖' },
    player: 'Alex 45',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '7',
    game: { name: 'Game Name', icon: '💎' },
    player: 'AAAAAAA56',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '8',
    game: { name: 'Game Name', icon: '🏴‍☠️' },
    player: 'Mr.Mep',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '9',
    game: { name: 'Game Name', icon: '🤠' },
    player: 'Saintboy78',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
  {
    id: '10',
    game: { name: 'Game Name', icon: '🎰' },
    player: 'Player10',
    time: '12:50:22 AM',
    bet: 20.0,
    multiplier: 88.44,
    payout: 150.25,
  },
];

export default function WinTable({ onViewAllClick }: WinTableProps) {
  const [activeTab, setActiveTab] = useState<'lucky' | 'high-rollers' | 'all'>('lucky');
  const isMobile = useIsMobile();

  const handleViewAll = () => {
    if (onViewAllClick) onViewAllClick();
  };

  const tabs = [
    { id: 'lucky', label: 'Lucky Bets' },
    { id: 'high-rollers', label: 'High Rollers' },
    { id: 'all', label: 'All Bets' },
  ] as const;

  return (
    <div className='w-full'>
      {/* Tabs */}
      <div className='bg-dark-indigo mb-6 flex w-full space-x-6 rounded-2xl p-3 md:w-fit'>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? 'secondary_soft' : 'ghost'}
            className={cn(
              'h-[35px] w-full rounded-xl px-4 py-2 text-xs font-medium transition-colors duration-200',
              'md:h-[47px] md:w-[133px] md:text-sm',
              activeTab === tab.id ? 'bg-lavander text-dark-indigo' : 'text-lavander'
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className='bg-dark-indigo overflow-hidden rounded-xl border border-solid border-[#22355A]'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-dark-indigo'>
              <tr>
                <th className='text-lavander/50 px-4 py-3 text-left text-sm font-medium'>Game</th>
                {!isMobile && <th className='text-lavander/50 px-4 py-3 text-left text-sm font-medium'>Player</th>}
                {!isMobile && <th className='text-lavander/50 px-4 py-3 text-left text-sm font-medium'>Time</th>}
                {!isMobile && <th className='text-lavander/50 px-4 py-3 text-left text-sm font-medium'>Bet</th>}
                {!isMobile && <th className='text-lavander/50 px-4 py-3 text-left text-sm font-medium'>Multiplier</th>}
                <th className='text-lavander/50 px-4 py-3 text-right text-sm font-medium'>Payout</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-700'>
              {mockBetData.map((bet, index) => (
                <tr
                  key={bet.id}
                  className={`${index % 2 === 0 ? 'bg-dark-primary' : 'bg-[#22355A]'} transition-colors duration-200 ${isMobile ? 'h-[36px]' : ''}`}
                >
                  {/* Game Column */}
                  <td className={`px-4 ${isMobile ? 'py-2' : 'py-3'}`}>
                    <div className='flex items-center space-x-2'>
                      <span className={isMobile ? 'text-base' : 'text-lg'}>{bet.game.icon}</span>
                      <span className={`text-lavander font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
                        {bet.game.name}
                      </span>
                    </div>
                  </td>

                  {/* Player Column - Desktop only */}
                  {!isMobile && (
                    <td className='px-4 py-3'>
                      <span className='text-lemon-yellow/50 text-sm font-light'>{bet.player}</span>
                    </td>
                  )}

                  {/* Time Column - Desktop only */}
                  {!isMobile && (
                    <td className='px-4 py-3'>
                      <span className='text-lemon-yellow/50 text-sm font-light'>{bet.time}</span>
                    </td>
                  )}

                  {/* Bet Column - Desktop only */}
                  {!isMobile && (
                    <td className='px-4 py-3'>
                      <span className='bg-lemon-yellow inline-flex items-center rounded-[6px] px-3 py-1 text-xs font-medium text-black'>
                        {bet.bet.toFixed(2)}$
                      </span>
                    </td>
                  )}

                  {/* Multiplier Column - Desktop only */}
                  {!isMobile && (
                    <td className='px-4 py-3'>
                      <span className='bg-lavander text-dark-indigo inline-flex items-center rounded-[6px] px-3 py-1 text-xs font-medium'>
                        X{bet.multiplier.toFixed(2)}
                      </span>
                    </td>
                  )}

                  {/* Payout Column */}
                  <td className={`px-4 ${isMobile ? 'py-2' : 'py-3'} text-right`}>
                    <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
                      {bet.payout.toFixed(2)}$
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
