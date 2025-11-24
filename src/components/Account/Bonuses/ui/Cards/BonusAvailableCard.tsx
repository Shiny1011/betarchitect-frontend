'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/shared';

interface BonusAvailableCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
}

export const BonusAvailableCard = (props: BonusAvailableCardProps) => {
  const {
    title = 'Casino bonus',
    description = 'Verify your phone number to be the first to know about our bonus offers and exciting promos!',
    imageUrl = '/bonus-available.png',
  } = props;
  const t = useTranslations();

  return (
    <div className='bg-dark-indigo flex w-[474px] gap-6 rounded-[16px] p-6'>
      <div className='bg-blue-indigo relative h-[142px] w-[159px] overflow-hidden rounded-lg'>
        <Image src={imageUrl} alt={title} fill className='object-cover' />
      </div>
      <div className='flex-1'>
        <div className='font-bold'>{title}</div>
        <div className='mt-1.5 mb-6 text-xs font-light'>{description}</div>
        <Button className='h-8 w-30 rounded-full text-xs md:font-medium'>{t('buttons.claimBonus')}</Button>
      </div>
    </div>
  );
};
