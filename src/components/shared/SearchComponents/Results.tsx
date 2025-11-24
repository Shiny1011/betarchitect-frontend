'use client';

import React from 'react';

import Image from 'next/image';

interface Game {
  id: string;
  name: string;
  provider: string;
  imageUrl: string;
  isNew?: boolean;
  isLive?: boolean;
  category?: string;
}

interface ResultsProps {
  games: Game[];
}

export function Results({ games }: ResultsProps) {
  return (
    <div className='mt-[18px] flex min-h-0 flex-1 flex-col max-md:mt-3 max-md:rounded-lg max-md:bg-[#0A1628] max-md:p-4'>
      <div className='flex items-center gap-2'>
        <div className='text-lemon-yellow text-[18px] font-medium'>Results</div>
        <div className='text-lemon-yellow md:bg-dark-indigo flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#182641] text-[14px] font-medium'>
          {games.length}
        </div>
      </div>

      <div className='mt-4 h-[430px] overflow-y-auto pr-[26px] max-md:h-full'>
        <div className='grid grid-cols-2 gap-[15px] sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
          {games.map((game) => (
            <div
              key={game.id}
              className='group bg-dark-indigo relative w-full cursor-pointer overflow-hidden rounded-xl shadow-md transition-shadow duration-200 hover:shadow-lg'
            >
              <div className='relative'>
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  width={200}
                  height={150}
                  className='w-full rounded-t-[8px] object-cover object-top'
                  draggable={false}
                />
              </div>

              <div className='bg-dark-indigo flex h-[45px] w-full flex-col justify-center px-[10px]'>
                <div className='text-lemon-yellow truncate text-[12px]'>{game.name}</div>
                <div className='text-lemon-yellow/50 truncate text-[10px]'>{game.provider}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
