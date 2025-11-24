'use client';
import { useTranslations } from 'next-intl';

import FloatingInput from '@/components/UI/FloatingInput';
import { CiLockIcon } from '@/Icons';
import { useUserCache } from '@/lib/hooks';

export const PersonalData = () => {
  const { user } = useUserCache();
  const t = useTranslations();

  return (
    <section className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
      <div className='mb-6'>
        <h2 className='text-lemon-yellow text-[20px] font-semibold'>Personal data</h2>
        <p className='text-lemon-yellow/50 text-sm'>To edit the locked fields, please contact support</p>
      </div>
      <div className='space-y-[18px]'>
        <FloatingInput
          label={t('form.fields.username')}
          value={user?.username || ''}
          onChange={() => {}}
          inputClassName='pointer-events-none text-lemon-yellow/50'
          rightAdornment={<CiLockIcon color='#768915' />}
        />
        <FloatingInput
          label={t('form.fields.firstName')}
          value={user?.first_name || ''}
          onChange={() => {}}
          inputClassName='pointer-events-none text-lemon-yellow/50'
          rightAdornment={<CiLockIcon color='#768915' />}
        />
        <FloatingInput
          label={t('form.fields.lastName')}
          value={user?.last_name || ''}
          onChange={() => {}}
          inputClassName='pointer-events-none text-lemon-yellow/50'
          rightAdornment={<CiLockIcon color='#768915' />}
        />
        <FloatingInput
          label={t('form.fields.birthday')}
          value={user?.birthday || ''}
          onChange={() => {}}
          inputClassName='pointer-events-none text-lemon-yellow/50'
          rightAdornment={<CiLockIcon color='#768915' />}
        />
      </div>
    </section>
  );
};
