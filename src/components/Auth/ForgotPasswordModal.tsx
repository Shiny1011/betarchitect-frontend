'use client';

import { useTranslations } from 'next-intl';

import { PasswordRecoveryForm } from '@/components/features';
import { Modal } from '@/components/shared';

interface ForgotPasswordModalProps {
  open: boolean;
  onClose?: VoidFunction;
  onSuccess?: VoidFunction;
}

export function ForgotPasswordModal({ open, onClose, onSuccess }: ForgotPasswordModalProps) {
  const t = useTranslations();

  return (
    <Modal title={t('auth.forgotPassword.title')} open={open} onClose={onClose}>
      <p className='text-lemon-yellow mt-6 max-md:text-sm md:mt-8'>{t('auth.forgotPassword.subtitle')}</p>
      <PasswordRecoveryForm onSuccess={onSuccess} />
    </Modal>
  );
}
