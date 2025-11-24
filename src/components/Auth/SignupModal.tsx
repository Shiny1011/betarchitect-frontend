'use client';

import { useTranslations } from 'next-intl';

import { SignupForm } from '@/components/features';
import { Button, Modal } from '@/components/shared';

interface SignupModalProps {
  open: boolean;
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
  onLogin?: VoidFunction;
}

export function SignupModal({ open, onClose, onLogin, onSuccess }: SignupModalProps) {
  const t = useTranslations();

  return (
    <Modal title={t('auth.signup.title')} open={open} onClose={onClose} fullscreenOnMobile>
      <SignupForm onClose={onClose} onSuccess={onSuccess} />
      <p className='text-center text-sm'>
        <span className='text-lavander mr-1'>{t('auth.signup.hasAccount')}</span>
        <Button onClick={onLogin} variant='underline'>
          {t('auth.login.btn')}
        </Button>
      </p>
    </Modal>
  );
}
