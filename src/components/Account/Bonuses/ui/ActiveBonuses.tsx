'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { ProgressBar } from '@/components/shared';

import { BonusActiveCard } from './Cards';
import { BonusDetailsModal } from '../../Modal/BonusDetailsModal';
import { BonusForfeitModal } from '../../Modal/BonusForfeitModal';
import { useBonuses } from '../hooks/useBonuses';
import { useForfeitBonus } from '../hooks/useForfeitBonus';

export function ActiveBonuses() {
  const t = useTranslations();
  const [forfeitOpen, setForfeitOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { bonuses } = useBonuses('active');
  const { mutate: forfeitBonus, isError, isPending } = useForfeitBonus();

  const handleForfeit = (playerId: string): void => {
    forfeitBonus(playerId, {
      onSettled: () => setForfeitOpen(true),
    });
  };

  return (
    <>
      <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {bonuses.map(({ id, playerId }) => (
          <BonusActiveCard
            key={id}
            isForfeiting={isPending}
            onDetailsClick={() => setDetailsOpen(true)}
            onForfeitClick={() => handleForfeit(playerId)}
          />
        ))}

        <div className='bg-dark-indigo relative flex min-h-[246px] flex-col justify-between rounded-2xl p-6 shadow-md'>
          <div className=''>
            <div className='flex items-start justify-between'>
              <div className='space-y-[6px]'>
                <div className='text-lemon-yellow text-[16px] font-bold'>Casino bonus</div>
                <p className='text-lemon-yellow text-xs font-light'>
                  Verify your phone number to be the first to know about our bonus offers and exciting promos!
                </p>
              </div>
            </div>
            <div className='mt-4'>
              <div className='flex w-full items-center justify-between'>
                <div className='text-lavander text-[10px] capitalize'>Left Free Spins</div>
                <div className='text-lavander text-[10px] capitalize'>12 / 50 </div>
              </div>
              <div className='mt-1'>
                <ProgressBar value={12} total={50} variant={'default'} />
              </div>

              <div className='mt-[13px] flex w-full items-center justify-between'>
                <div className='text-lavander text-[10px] capitalize'>Left Bonus Money</div>
                <div className='text-lavander text-[10px] capitalize'>120$ / 350$ </div>
              </div>
              <div className='mt-1'>
                <ProgressBar value={120} total={350} variant={'default'} />
              </div>

              <div className='mt-2 flex items-center'>
                <div className='text-lemon-yellow/50 text-[10px] leading-tight capitalize'>Time Left:</div>
                <div className='text-[10px] leading-tight capitalize'>9d:9h:15m</div>
              </div>
            </div>
          </div>
          <div className='mt-[14px] flex gap-3'>
            <button className='bg-lemon-yellow text-blue-indigo h-[32px] w-[130px] rounded-full text-xs font-medium'>
              Continue Playing
            </button>
            <button
              onClick={() => setForfeitOpen(true)}
              className='text-lemon-yellow border-lemon-yellow h-[32px] w-[130px] rounded-full border text-xs font-medium'
            >
              Forfeit
            </button>
          </div>
        </div>
      </div>
      <BonusForfeitModal
        open={forfeitOpen}
        onClose={() => setForfeitOpen(false)}
        title={isError ? t('common.notification.forfeitError') : t('common.notification.forfeitSuccess')}
      />
      <BonusDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </>
  );
}
