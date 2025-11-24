'use client';

import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { CloseIcon } from '@/Icons';
import { IconProps } from '@/lib/schema';

interface SessionDetails {
  id: string;
  device: string;
  date: string;
  os?: string;
  ip?: string;
  location?: string;
  loginTime?: string;
  lastActivity?: string;
  duration?: string;
  Icon?: React.FC<IconProps>;
}

interface SessionDetailsModalProps {
  open: boolean;
  onClose: () => void;
  onTerminate?: (id: string) => void;
  session?: SessionDetails | null;
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

export default function SessionDetailsModal({ open, onClose, onTerminate, session }: SessionDetailsModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key='session-overlay'
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={overlayVariants}
          className='fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-sm'
          onClick={onClose}
        >
          <motion.div
            key='session-panel'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={panelVariants}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className='bg-blue-indigo relative w-[480px] max-w-[95vw] transform-gpu rounded-2xl px-6 pt-10 pb-6 shadow-xl'
          >
            <div className='absolute top-3 right-3'>
              <button
                onClick={onClose}
                aria-label='Close'
                className='text-lemon-yellow/80 hover:text-lemon-yellow hover:bg-lemon-yellow/10 h-8 w-8 rounded transition-colors'
              >
                <CloseIcon />
              </button>
            </div>

            <div className='flex flex-col items-center gap-4'>
              <div className='text-lemon-yellow text-[22px] font-bold'>Session</div>
              <div className='bg-lemon-yellow text-dark-indigo grid h-24 w-24 place-items-center rounded-[24px]'>
                {session?.Icon && <session.Icon size={38} />}
              </div>
              <div className='text-center'>
                <div className='text-lavander text-[20px] font-semibold'>{session?.device ?? 'Session'}</div>
                <div className='text-lavander/50 mt-1 text-base'>{session?.date ?? ''}</div>
              </div>
            </div>

            <div className='mt-4 rounded-2xl bg-[#0F1B33] p-[18px]'>
              <div className='space-y-[18px]'>
                {session?.os && (
                  <div className='text-lemon-yellow text-sm'>
                    <span className='text-lemon-yellow/50'>Device:</span> {session.os}
                  </div>
                )}
                {session?.ip && (
                  <div className='text-lemon-yellow text-sm'>
                    <span className='text-lemon-yellow/50'>IP Address:</span> {session.ip}
                  </div>
                )}
                {session?.location && (
                  <div className='text-lemon-yellow text-sm'>
                    <span className='text-lemon-yellow/50'>Location:</span> {session.location}
                  </div>
                )}
                {session?.loginTime && (
                  <div className='text-lemon-yellow text-sm'>
                    <span className='text-lemon-yellow/50'>Login Time:</span> {session.loginTime}
                  </div>
                )}
                {session?.lastActivity && (
                  <div className='text-lemon-yellow text-sm'>
                    <span className='text-lemon-yellow/50'>Last Activity:</span> {session.lastActivity}
                  </div>
                )}
                {session?.duration && (
                  <div className='text-lavander text-sm'>
                    <span>Session Duration:</span> {session.duration}
                  </div>
                )}
              </div>
            </div>

            <div className='mt-[14px] flex items-center justify-start'>
              <button
                type='button'
                onClick={() => session?.id && onTerminate?.(session.id)}
                className='h-[34px] cursor-pointer rounded-full bg-[#FE2D08] px-6 text-sm text-white transition-colors'
              >
                Terminate session
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
