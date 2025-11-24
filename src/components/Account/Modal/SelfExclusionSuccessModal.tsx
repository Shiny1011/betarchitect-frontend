'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

interface SelfExclusionSuccessModalProps {
  open: boolean;
  onClose: () => void;
  until?: Date | null;
}

function formatDate(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}.${mm}.${yy}`;
}

export default function SelfExclusionSuccessModal({ open, onClose, until }: SelfExclusionSuccessModalProps) {
  const untilText = until ? formatDate(until) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className='relative w-[520px] max-w-[95vw] rounded-2xl bg-[#13203D] px-6 py-8 shadow-xl'
          >
            <div className='flex items-center justify-center'>
              <h3 className='text-lemon-yellow text-[22px] font-semibold'>Successful</h3>
            </div>
            <button
              onClick={onClose}
              className='text-lemon-yellow/80 hover:bg-lemon-yellow/10 hover:text-lemon-yellow absolute top-5 right-5 h-8 w-8 rounded transition-all duration-200'
              aria-label='Close'
            >
              ✕
            </button>

            <p className='text-lemon-yellow/85 mt-3 px-3 text-center text-base'>
              Your self-exclusion has been activated.
              {untilText ? (
                <> You will not be able to log in until {untilText}. </>
              ) : (
                <> You will not be able to log in. </>
              )}
              For urgent support, contact Support center.
            </p>

            <div className='mt-6 flex items-center justify-center'>
              <button
                onClick={onClose}
                className='bg-lemon-yellow hover:bg-lemon-yellow/90 text-dark-indigo w-full max-w-[420px] rounded-full py-3 font-semibold'
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
