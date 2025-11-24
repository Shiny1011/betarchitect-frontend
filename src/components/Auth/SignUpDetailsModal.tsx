'use client';

import { useTranslations } from 'next-intl';

import { SignupDetailsForm } from '@/components/features';
import { Modal } from '@/components/shared';
import { useSignupStage } from '@/lib/hooks';

interface SignUpDetailsModalProps {
  open: boolean;
  onClose?: VoidFunction;
  onSuccess?: VoidFunction;
}

export function SignUpDetailsModal({ open, onSuccess }: SignUpDetailsModalProps) {
  const t = useTranslations();
  const { isSignupStage1 } = useSignupStage();

  return (
    <Modal open={open || isSignupStage1} title={t('auth.signup.detailsTitle')} fullscreenOnMobile>
      <SignupDetailsForm onSuccess={onSuccess} />
    </Modal>
  );
}
