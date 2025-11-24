'use client';

import React, { useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import ConsentRadio from '@/components/UI/ConsentRadio';
import { CloseIcon, SearchIcon } from '@/Icons';
import { FIAT_CURRENCIES, CurrencyCode, CurrencyNames } from '@/lib/currency';

interface NewCurrencyModalProps {
  open: boolean;
  onClose: VoidFunction;
  onAdd?: (currencyCode: CurrencyCode) => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

export default function NewCurrencyModal({ open, onClose, onAdd }: NewCurrencyModalProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CurrencyCode>(FIAT_CURRENCIES[0].code ?? CurrencyCode.EUR);
  const t = useTranslations();

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return FIAT_CURRENCIES;
    return FIAT_CURRENCIES.filter((c) => CurrencyNames[c.code].toLowerCase().includes(s));
  }, [search]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const choiceCode = selected || filtered[0].code;
    if (choiceCode) onAdd?.(choiceCode);
    onClose();
  }

  const getLocalizedName = (currency: (typeof FIAT_CURRENCIES)[number]) => {
    const localizationKey = `common.currency.names.${currency.name}`;
    return t(localizationKey, {
      defaultMessage: currency.name,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={overlayVariants}
          className='fixed inset-0 z-[100]'
        >
          <div className='absolute inset-0 bg-[#000]/60' onClick={onClose} />
          <motion.div
            variants={panelVariants}
            className='absolute top-1/2 left-1/2 w-[378px] -translate-x-1/2 -translate-y-1/2'
          >
            <div className='bg-blue-indigo relative w-full rounded-[12px] border border-[#22355A] p-5 shadow-xl'>
              <div className='flex items-center justify-end'>
                <button
                  type='button'
                  onClick={onClose}
                  aria-label='Close'
                  className='hover:bg-lemon-yellow/10 -mt-2 -mr-2 grid h-8 w-8 place-items-center rounded'
                >
                  <CloseIcon size={18} />
                </button>
              </div>
              <h3 className='text-lemon-yellow text-xl font-bold'>{t('modal.title.newCurrency')}</h3>

              <form onSubmit={submit} className='mt-4 space-y-4'>
                {/* Search */}
                <div className='relative'>
                  <div className='border-lemon-yellow/50 flex items-center gap-2 border-b pb-2'>
                    <SearchIcon size={18} opacity={0.5} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t('modal.title.searchPlaceholder')}
                      className='text-lemon-yellow placeholder:text-lemon-yellow/50 w-full bg-transparent outline-none'
                    />
                  </div>
                </div>

                {/* List */}
                <div className='h-[260px] space-y-2 overflow-auto pr-2'>
                  {filtered.map((c, idx) => (
                    <ConsentRadio
                      key={c.code}
                      id={`currency-${c.code}`}
                      name='new-currency'
                      label={getLocalizedName(c)}
                      checked={selected === c.code}
                      onChange={() => setSelected(c.code)}
                      className='accent-lemon-yellow'
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div className='text-lemon-yellow/50 text-sm'>{t('modal.text.noResultsFound')}</div>
                  )}
                </div>

                {/* Action */}
                <div className='mt-2'>
                  <button
                    type='submit'
                    className='bg-lemon-yellow hover:bg-lemon-yellow/90 text-dark-indigo w-full rounded-md py-3 font-semibold'
                  >
                    {t('buttons.add')}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
