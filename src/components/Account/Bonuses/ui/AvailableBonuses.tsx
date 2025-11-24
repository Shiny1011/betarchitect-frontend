'use client';

import { useState } from 'react';

import FloatingInput from '@/components/UI/FloatingInput';

import { BonusAvailableCard } from './Cards';
import { BonusSuccessModal } from '../../Modal/BonusSuccessModal';

export const AvailableBonuses = () => {
  const [promoCode, setPromoCode] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <div className='flex w-full flex-wrap gap-6'>
      <div className='bg-dark-indigo w-[474px] rounded-[16px] px-6 py-[35px]'>
        <div className='text-lavander font-bold'>Got a promo code? Enter it here</div>
        <FloatingInput
          label='Enter promo code'
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className='mt-3'
        />
        <button
          onClick={() => setSuccessOpen(true)}
          className={`bg-blue-indigo text-lavander/50 mt-4 h-[32px] w-[130px] rounded-full text-xs font-medium`}
        >
          Active Bonus
        </button>
      </div>
      <BonusAvailableCard />
      <BonusSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
};
