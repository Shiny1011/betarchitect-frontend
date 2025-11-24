'use client';

import { useState, useEffect } from 'react';

export default function TournamentSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 23,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='mb-8'>
      <h2 className='text-lemon-yellow leading-full mb-[18px] text-[22px] font-bold'>Tournaments</h2>

      <div className='bg-dark-indigo flex h-[368px] w-full items-center rounded-xl p-6'>
        <div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between'>
          <div className='mb-6 lg:mb-0'>
            <div className='text-lemon-yellow mb-2.5 text-[22px] leading-tight font-semibold'>Golden Spin Cup</div>
            <div className='text-lemon-yellow/50 mb-[4px] leading-tight'>Prize winner:</div>
            <div className='text-lavander mb-6 text-[18px] leading-tight font-semibold'>800$ + 200 FS</div>

            <button className='bg-lavander text-blue-indigo h-[44px] rounded-sm px-4 text-[14px] font-semibold transition-colors duration-300'>
              PARTICIPATE IN A TOURNAMENT
            </button>
          </div>

          <div className='lg:text-left'>
            <div className='text-lavander/50 mb-3 text-base'>Time before the Tournament</div>
            <div className='flex space-x-6'>
              <div className='text-center'>
                <div className='bg-blue-indigo flex h-[80px] w-[70px] flex-col items-center justify-center rounded-[12px]'>
                  <div className='text-lemon-yellow/50 text-xs'>Days:</div>
                  <div className='text-lemon-yellow text-[22px] font-medium'>
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <div className='bg-blue-indigo flex h-[80px] w-[70px] flex-col items-center justify-center rounded-[12px]'>
                  <div className='text-lemon-yellow/50 text-xs'>Hours:</div>
                  <div className='text-lemon-yellow text-[22px] font-medium'>
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <div className='bg-blue-indigo flex h-[80px] w-[70px] flex-col items-center justify-center rounded-[12px]'>
                  <div className='text-lemon-yellow/50 text-xs'>Minutes:</div>
                  <div className='text-lemon-yellow text-[22px] font-medium'>
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <div className='bg-blue-indigo flex h-[80px] w-[70px] flex-col items-center justify-center gap-1 rounded-[12px]'>
                  <div className='text-lemon-yellow/50 text-xs'>Seconds:</div>
                  <div className='text-lemon-yellow text-[22px] font-medium'>
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
