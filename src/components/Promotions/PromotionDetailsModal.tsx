'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { CloseIcon } from '@/Icons';

export interface PromotionDetailsContent {
  title: string;
  descriptionLead?: string;
  heroImageUrl?: string;
  bullets?: { section: string; items: React.ReactNode[] }[];
  ctaText?: string;
}

interface PromotionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  content: PromotionDetailsContent;
}

export default function PromotionDetailsModal({ open, onClose, content }: PromotionDetailsModalProps) {
  const { title, descriptionLead, heroImageUrl, bullets = [], ctaText = 'Claim Now' } = content;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[110] flex items-center justify-center bg-black/60'
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='bg-blue-indigo relative my-[2vh] h-[96vh] w-[741px] max-w-[92vw] rounded-2xl border border-solid border-[#22355A] pt-[22px] pb-[32px] pl-5'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='h-full overflow-y-auto pr-4'>
              <div className='flex w-full justify-end'>
                <button
                  onClick={onClose}
                  aria-label='Close'
                  className='flex cursor-pointer items-center justify-center rounded transition-colors'
                >
                  <CloseIcon />
                </button>
              </div>

              <div className='bg-dark-indigo mt-2 rounded-lg'>
                <div className='h-[249px] w-full rounded-lg' />
              </div>

              {descriptionLead && <p className='text-lavander mt-3 text-[18px] font-bold'>{descriptionLead}</p>}

              <div className='mt-6 space-y-6'>
                {bullets.map((b) => (
                  <div key={b.section}>
                    <div className='text-lemon-yellow mb-2.5 text-[18px] leading-tight font-semibold'>{b.section}</div>
                    <ul className='text-lemon-yellow/85 list-disc pl-5 text-[14px]'>
                      {b.items.map((it, idx) => (
                        <li key={`${b.section}-${idx}`}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className='mt-8'>
                <button
                  type='button'
                  className='bg-lemon-yellow text-blue-indigo w-full rounded-lg py-3 text-[16px] font-medium'
                  onClick={onClose}
                >
                  {ctaText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
