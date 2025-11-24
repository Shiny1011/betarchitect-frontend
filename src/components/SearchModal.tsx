'use client';

import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Results, ProviderFilter, GameSearch, CategoryFilter } from '@/components/shared';
import { GAME_ITEMS } from '@/constants';
import { useGameSearch } from '@/lib/hooks';

interface SearchModalProps {
  open: boolean;
  onClose?: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [search, setSearch] = useState('');
  const filtered = useGameSearch(GAME_ITEMS, search);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[110] flex items-start justify-center bg-black/60'
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='relative mt-[93px] flex h-[590px] min-h-0 w-[960px] max-w-[96vw] gap-[18px] overflow-hidden rounded-2xl bg-transparent'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='bg-blue-indigo col-span-7 flex h-full w-[560px] flex-col overflow-hidden rounded-2xl border border-[#22355A] p-6'>
              <div className='text-lemon-yellow text-[22px] font-bold'>Search</div>
              <div className='mt-[18px]'>
                <GameSearch value={search} onChange={setSearch} />
              </div>

              <Results games={filtered} />
            </div>

            <div className='bg-blue-indigo col-span-5 flex h-full min-h-0 w-[323px] flex-col overflow-hidden rounded-2xl border border-[#22355A] p-6'>
              <div className='text-lemon-yellow text-[22px] font-bold'>Filters</div>
              <CategoryFilter />
              <ProviderFilter />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
