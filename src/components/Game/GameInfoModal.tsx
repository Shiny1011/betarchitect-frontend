import React from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { CloseIcon } from '@/Icons';

interface GameInfo {
  name: string;
  provider: string;
  imageUrl: string;
  rtpLow?: number;
  rtpHigh?: number;
  volatility?: string;
  paylines?: string; // e.g. "6 x 5"
  betMin?: number; // in $
  betMax?: number; // in $
}

interface GameInfoModalProps {
  open: boolean;
  onClose: () => void;
  game: GameInfo;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export default function GameInfoModal({ open, onClose, game }: GameInfoModalProps) {
  const { name, provider, imageUrl, rtpLow, rtpHigh, volatility, paylines, betMin, betMax } = game;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key='game-info-overlay'
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={overlayVariants}
          className='fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            key='game-info-panel'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={panelVariants}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-blue-indigo relative w-[393px] max-w-[95vw] transform-gpu rounded-2xl p-8 pt-5 shadow-xl'
          >
            <div className='flex w-full justify-end'>
              <button
                onClick={onClose}
                aria-label='Close'
                className='flex cursor-pointer items-center justify-center rounded transition-colors'
              >
                <CloseIcon />
              </button>
            </div>

            <div className='mt-3'>
              <div className='overflow-hidden rounded-xl'>
                <img src={imageUrl} alt={name} className='h-[382px] w-full object-cover' draggable={false} />
              </div>

              <div className='mt-[28px] space-y-[5px]'>
                <div className='text-lemon-yellow text-[22px] leading-[28px] font-semibold'>{name}</div>
                <div className='text-lemon-yellow/50 text-[18px] leading-[23px]'>{provider}</div>
              </div>

              <div className='mt-[22px] space-y-2'>
                <div className='flex items-center gap-[10px]'>
                  <span className='text-lemon-yellow/50 text-base'>RTP:</span>
                  <span className='text-lemon-yellow text-base'>
                    {rtpLow && rtpHigh ? `${rtpLow.toFixed(2)}%–${rtpHigh.toFixed(2)}%` : '—'}
                  </span>
                </div>
                <div className='flex items-center gap-[10px]'>
                  <span className='text-lemon-yellow/60 text-base leading-[20px]'>Volatility:</span>
                  <span className='text-lemon-yellow text-base leading-[20px]'>{volatility ?? '—'}</span>
                </div>
                <div className='flex items-center gap-[10px]'>
                  <span className='text-lemon-yellow/60 text-base leading-[20px]'>Paylines:</span>
                  <span className='text-lemon-yellow text-base leading-[20px]'>{paylines ?? '—'}</span>
                </div>
                <div className='flex items-center gap-[10px]'>
                  <span className='text-lemon-yellow/60 text-base leading-[20px]'>Bet range:</span>
                  <span className='text-lemon-yellow text-base leading-[20px]'>
                    {betMin != null && betMax != null ? `$${betMin.toFixed(2)} to $${betMax.toFixed(0)}` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
