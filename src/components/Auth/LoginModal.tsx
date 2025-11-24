'use client';

import { useTranslations } from 'next-intl';

import { LoginForm } from '@/components/features';
import { Button, Modal } from '@/components/shared';

interface LoginModalProps {
  open: boolean;
  onClose: VoidFunction;
  onForgot?: VoidFunction;
  onSignup?: VoidFunction;
}

export function LoginModal(props: LoginModalProps) {
  const { open, onClose, onForgot, onSignup } = props;
  const t = useTranslations();

  return (
    <Modal title={t('auth.login.title')} open={open} onClose={onClose} fullscreenOnMobile>
      <LoginForm onPassForgot={onForgot} onClose={onClose} />
      <p className='text-center'>
        <span className='text-lavander mr-1 max-md:text-sm'>{t('auth.login.noAccount')}</span>
        <Button type='button' variant='underline' onClick={() => onSignup?.()} className='max-md:text-sm'>
          {t('auth.signup.btn')}
        </Button>
      </p>
    </Modal>
  );
}
