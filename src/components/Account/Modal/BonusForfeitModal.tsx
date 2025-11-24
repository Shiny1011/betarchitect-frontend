'use client';

import { Modal } from '@/components/shared';

interface BonusForfeitModalProps {
  open: boolean;
  title?: string;
  onClose: VoidFunction;
}

export function BonusForfeitModal({ open, onClose, title }: BonusForfeitModalProps) {
  return <Modal open={open} onClose={onClose} title={title} />;
}
