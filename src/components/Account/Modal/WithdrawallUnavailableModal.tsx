'use client';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Button, Modal } from '@/components/shared';

interface WithdrawallUnavailableModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export default function WithdrawallUnavailableModal({ open = true, onClose }: WithdrawallUnavailableModalProps) {
  const router = useRouter();
  const t = useTranslations();

  const handleVerifyClick = () => {
    onClose();
    router.push('/[locale]/account/security');
  };

  return (
    <Modal title={t('modal.title.withdrawalUnavailable')} open={open} onClose={onClose}>
      <p className='text-lemon-yellow mt-2 text-center'>{t('modal.text.withdrawalUnavailable')}</p>
      <Button onClick={handleVerifyClick} className='mt-[42px] h-12 w-full rounded-[12px] font-semibold'>
        {t('buttons.verify')}
      </Button>
    </Modal>
  );
}
