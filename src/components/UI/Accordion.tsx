'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { DownArrowIcon } from '@/Icons';
import { cn } from '@/lib/utils';

interface IClasses {
  root?: string;
  titleBox?: string;
}

interface AccordionProps {
  title: React.ReactNode;
  titleLeftIcon?: (props: { isOpen: boolean }) => React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: IClasses;
  open?: boolean;
  arrowSize?: number;
  onToggle?: (nextOpen: boolean) => void;
}

export default function Accordion({
  title,
  titleLeftIcon,
  children,
  defaultOpen = false,
  className,
  open,
  arrowSize = 18,
  onToggle,
}: AccordionProps) {
  const [isOpenInternal, setIsOpenInternal] = useState(defaultOpen);
  const isOpen = open ?? isOpenInternal;

  return (
    <div className={cn(`bg-dark-indigo w-full rounded-[16px] p-6 ${className?.root ?? ''}`)}>
      <button
        type='button'
        onClick={() => {
          const next = !isOpen;
          if (onToggle) onToggle(next);
          else setIsOpenInternal(next);
        }}
        aria-expanded={isOpen}
        className='flex w-full items-center justify-between'
      >
        <div
          className={cn(
            `text-[18px] font-semibold ${isOpen ? 'text-lemon-yellow' : 'text-lemon-yellow/50'} ${className?.titleBox ?? ''}`
          )}
        >
          {titleLeftIcon?.({ isOpen })}
          {title}
        </div>
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} transition={{ duration: 0.2, ease: 'easeOut' }}>
          <DownArrowIcon size={arrowSize} opacity={isOpen ? 1 : 0.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='accordion-content'
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 10 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
            className='text-xs'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
