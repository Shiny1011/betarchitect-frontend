'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { SearchIcon, CloseIcon } from '@/Icons';
import type { CountryCode } from '@/lib/countryCodes';

interface CountrySelectModalProps {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  countries: CountryCode[];
  selectedCode?: string | null;
  onClose: () => void;
  onSelect: (c: CountryCode) => void;
}

export function CountrySelectModal({
  open,
  query,
  onQueryChange,
  countries,
  selectedCode,
  onClose,
  onSelect,
}: CountrySelectModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key='country-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[100] bg-black/40'
          onClick={onClose}
        >
          <motion.div
            key='country-panel'
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className='bg-blue-indigo absolute top-1/2 left-1/2 z-10 w-[360px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-[12px] border border-[#22355A] p-4 shadow-2xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex w-full items-center justify-end'>
              <button
                type='button'
                onClick={onClose}
                className='text-lemon-yellow text-xl leading-none'
                aria-label='Close'
              >
                <CloseIcon size={15} color='#E0FE08' opacity={0.7} />
              </button>
            </div>
            <div className='relative mb-3 flex items-center justify-between'>
              <SearchIcon size={20} opacity={0.5} className='absolute' />
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder='Search'
                className='text-lemon-yellow placeholder:text-lemon-yellow/50 border-lemon-yellow/30 focus:border-lemon-yellow w-full border-b bg-transparent py-1 pl-8 text-sm outline-none'
              />
            </div>
            <div className='h-[300px] space-y-[18px] overflow-auto pr-[10px]'>
              {countries.map((c, idx) => {
                const selected = selectedCode === c.code;
                return (
                  <button
                    type='button'
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(c);
                    }}
                    className={`flex w-full items-center justify-between rounded-[10px] border px-3 py-3 text-left text-sm ${
                      selected
                        ? 'border-lemon-yellow bg-dark-indigo ring-lemon-yellow ring-1'
                        : 'hover:bg-lemon-yellow/10 border-[#22355A]'
                    }`}
                  >
                    <span className='flex items-center gap-3'>
                      {c.flag ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.flag} alt={c.name} className='h-4 w-6 rounded-sm object-cover' />
                      ) : (
                        <span className='bg-lemon-yellow/20 inline-block h-4 w-6 rounded-sm' />
                      )}
                      <span className='text-lemon-yellow'>{c.name}</span>
                    </span>
                    <span className='flex items-center justify-center'>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selected ? 'border-lemon-yellow' : 'border-[#22355A]'
                        }`}
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${selected ? 'bg-lemon-yellow' : 'bg-transparent'}`}
                        />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
