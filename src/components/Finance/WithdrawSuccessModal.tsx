import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { CloseIcon } from '@/Icons';

interface WithdrawSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WithdrawSuccessModal({ open, onClose }: WithdrawSuccessModalProps) {
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
            className='relative w-[493px] rounded-2xl border border-solid border-[#22355A] bg-[#13203D] px-5 py-8'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex w-full justify-center'>
              <button
                onClick={onClose}
                className='text-lemon-yellow/80 hover:bg-lemon-yellow/10 hover:text-lemon-yellow absolute top-5 right-5 -mt-2 -mr-2 h-8 w-8 rounded transition-all duration-200'
              >
                <CloseIcon />
              </button>
            </div>
            <div className='flex items-center justify-center'>
              <h3 className='text-lemon-yellow text-[22px] font-semibold'>Success!</h3>
            </div>
            <p className='text-lemon-yellow/85 mt-2 px-3 text-center text-base'>
              Your withdrawal request has been submited!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
