'use client';

import { Modal } from '@/components/shared';

interface BonusSuccessModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export function BonusSuccessModal({ open, onClose }: BonusSuccessModalProps) {
  return (
    <Modal open={open} onClose={onClose} title='Success!'>
      <p className='text-lemon-yellow/85 mt-2 px-3 text-center text-base'>Bonus Successfully Activated</p>
    </Modal>
  );
}
