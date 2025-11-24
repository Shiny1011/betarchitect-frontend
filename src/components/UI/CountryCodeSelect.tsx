'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { type CountryCode, fetchCountryCodes } from '@/lib/countryCodes';

interface CountryCodeSelectProps {
  value?: string; // dial code like +381
  onChange?: (dialCode: string, meta?: CountryCode | undefined) => void;
  className?: string;
}

export default function CountryCodeSelect({ value, onChange, className }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState<CountryCode[]>([]);
  const [selected, setSelected] = useState<string>(value || '');
  const ref = useRef<HTMLDivElement | null>(null);

  const collapseVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
  };

  useEffect(() => {
    setSelected(value || '');
  }, [value]);

  useEffect(() => {
    let mounted = true;
    fetchCountryCodes().then((list) => {
      if (!mounted) return;
      setCodes(list);
      if (!selected && list.length) {
        const rs = list.find((c) => c.code === 'RS');
        const initial = rs?.dial_code || list[0].dial_code;
        setSelected(initial);
        const meta = list.find((c) => c.dial_code === initial);
        onChange?.(initial, meta);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const select = (dial: string) => {
    setSelected(dial);
    const meta = codes.find((c) => c.dial_code === dial);
    onChange?.(dial, meta);
    setOpen(false);
  };

  const selectedMeta = codes.find((c) => c.dial_code === selected);

  return (
    <div className={`relative ${className ?? ''}`} ref={ref}>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className={`bg-blue-indigo text-lemon-yellow active:border-lemon-yellow ${
          open ? 'border-lemon-yellow rounded-b-none border-b-transparent' : 'border-lemon-yellow/50'
        } flex h-12 w-full items-center justify-between rounded-[10px] border px-4 text-sm transition-all duration-200`}
      >
        <span className='flex items-center gap-2'>
          {selectedMeta?.flag ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={selectedMeta.flag} alt={selectedMeta.name} className='h-5 w-7 rounded-sm object-cover' />
          ) : (
            <span className='bg-lemon-yellow/20 inline-block h-5 w-7 rounded-sm' />
          )}
          <span className='text-lemon-yellow'>{selected || '+___'}</span>
        </span>
        <span className='text-lemon-yellow/70'>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={collapseVariants}
            className='bg-blue-indigo border-lemon-yellow absolute z-50 w-full overflow-hidden rounded-[10px] rounded-t-none border border-t-0 p-2 shadow-xl transition-[border] duration-100'
          >
            <div className='max-h-[225px] overflow-auto'>
              {codes.map((c, index) => (
                <button
                  type='button'
                  key={index}
                  onClick={() => select(c.dial_code)}
                  className='text-lemon-yellow hover:bg-lemon-yellow/10 flex h-[56px] w-full items-center gap-3 rounded px-3 py-2 text-left text-sm'
                >
                  {c.flag ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.flag} alt={c.name} className='h-4 w-6 rounded-sm object-cover' />
                  ) : (
                    <span className='bg-lemon-yellow/20 inline-block h-4 w-6 rounded-sm' />
                  )}
                  <span className='font-semibold'>{c.dial_code}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
