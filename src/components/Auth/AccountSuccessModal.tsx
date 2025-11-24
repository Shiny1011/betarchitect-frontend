'use client';

import { useTranslations } from 'next-intl';

import { Modal } from '@/components/shared';
import { IMAGE } from '@/constants/images';

interface AccountSuccessModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export function AccountSuccessModal({ open, onClose }: AccountSuccessModalProps) {
  const t = useTranslations();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t('common.greetings.welcome')}
      backgroundImage={<img src={IMAGE.HOME.SUCCESS_BG} alt='jackpot' className='h-full w-full object-cover' />}
      withImageOverlay
    >
      <p className='text-lemon-yellow mb-15 text-center max-md:text-sm md:mb-20'>{t('auth.signup.createSuccess')}</p>
    </Modal>
  );
}
