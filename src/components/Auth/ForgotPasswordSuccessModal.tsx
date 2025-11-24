'use client';

import { useTranslations } from 'next-intl';

import { Modal } from '@/components/shared';

interface ForgotPasswordSuccessModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export function ForgotPasswordSuccessModal({ open, onClose }: ForgotPasswordSuccessModalProps) {
  const t = useTranslations();

  return <Modal title={t('auth.forgotPassword.resetSuccess')} open={open} onClose={onClose} />;
}
