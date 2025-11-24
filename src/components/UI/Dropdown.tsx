'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import ConsentRadio from '@/components/UI/ConsentRadio';
import { DownArrowIcon } from '@/Icons';

interface DropdownProps<T extends string | number> {
  label: string;
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
  className?: string;
  width?: number;
  height?: number;
  dropdownColor?: string;
}

export default function Dropdown<T extends string | number>({
  label,
  value,
  options,
  onChange,
  className,
  width,
  height,
  dropdownColor,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const groupName = `dropdown-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const dropdownColorClass = dropdownColor ?? 'bg-blue-indigo';

  useEffect(() => {
    function handlePointerDown(e: Event) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <button
        type='button'
        className={`text-lemon-yellow ${dropdownColorClass} flex w-full border border-[#22355A] ${
          open ? 'rounded-t-[10px] border-b-transparent' : 'rounded-[10px] border-transparent'
        } items-center justify-between px-6 text-xs transition-all duration-200`}
        style={{ width: width ?? '100%', height: height ?? 48 }}
        onClick={() => {
          setOpen((o) => !o);
        }}
        aria-haspopup='listbox'
        aria-expanded={open}
      >
        <span>
          <span className={`font-medium transition-all ${open ? 'text-lemon-yellow' : 'text-lemon-yellow/50'}`}>
            {label}:
          </span>
          &nbsp;
          <span className='font-medium'>{options.find((o) => o.value === value)?.label ?? String(value)}</span>
        </span>
        <span className={`text-[#76C24D] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <DownArrowIcon />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key='dropdown-content'
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: 0 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
            className={`${dropdownColorClass} absolute z-20 w-full origin-top rounded-b-[10px] border border-[#22355A] border-t-transparent`}
          >
            <ul role='listbox' className='max-h-[180px] overflow-y-auto'>
              {options.map((opt) => (
                <li key={String(opt.value)}>
                  <ConsentRadio
                    id={`opt-${String(opt.value)}`}
                    name={groupName}
                    label={opt.label}
                    checked={opt.value === value}
                    onChange={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full px-6`}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
