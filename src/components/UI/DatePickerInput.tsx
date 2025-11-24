'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import FloatingInput from '@/components/UI/FloatingInput';
import CalendarIcon from '@/Icons/CalendarIcon';

interface DatePickerInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

// Simple calendar generator for current month view
function getMonthMatrix(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  // Monday-first week: convert JS Sunday(0)..Saturday(6) to Monday(0)..Sunday(6)
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Only current month days; placeholders (0) to align weeks
  const grid: { day: number; currentMonth: boolean }[] = [];
  for (let i = 0; i < startDay; i++) {
    grid.push({ day: 0, currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    grid.push({ day: d, currentMonth: true });
  }
  // Fill trailing placeholders to complete the final week
  while (grid.length % 7 !== 0) {
    grid.push({ day: 0, currentMonth: false });
  }
  return grid;
}

export default function DatePickerInput({
  label = '00 / 00 / 0000',
  value,
  onChange,
  className,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string>(value || '');
  const [view, setView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternal(value || '');
  }, [value]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Open dropdown when focus enters within this component (including the input)
  useEffect(() => {
    function onFocusIn(e: FocusEvent) {
      if (ref.current && ref.current.contains(e.target as Node)) {
        setOpen(true);
      }
    }
    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, []);

  const matrix = useMemo(() => getMonthMatrix(view.year, view.month), [view]);

  const selected = useMemo(() => {
    const m = internal.match(/^(\d{2})\s*\/\s*(\d{2})\s*\/\s*(\d{4})$/);
    if (!m) return null;
    const dd = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10) - 1; // 0-based
    const yyyy = parseInt(m[3], 10);
    return { day: dd, month: mm, year: yyyy };
  }, [internal]);

  const commit = (val: string) => {
    setInternal(val);
    onChange?.(val);
    setOpen(false);
  };

  const selectDay = (d: number) => {
    const mm = String(view.month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    const yyyy = String(view.year);
    commit(`${dd} / ${mm} / ${yyyy}`);
  };

  const nav = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  };

  return (
    <div className={className} ref={ref}>
      <div className={`relative`}>
        <FloatingInput
          label={label}
          type='text'
          value={internal}
          onChange={(e) => setInternal((e.target as HTMLInputElement).value)}
          leftAdornment={
            <button
              type='button'
              onClick={() => setOpen((o) => !o)}
              className='hover:bg-lemon-yellow/10 grid h-8 w-8 place-items-center rounded'
              aria-label='Toggle calendar'
            >
              <CalendarIcon className='text-lemon-yellow/70' size={18} />
            </button>
          }
          leftPaddingClass='pl-10'
        />

        <div
          className={`bg-blue-indigo absolute z-50 mt-2 w-[320px] rounded-[14px] ${
            open ? 'h-[320px] opacity-100' : 'pointer-events-none h-0 opacity-0'
          } border border-[#22355A] p-4 shadow-xl transition-all duration-300`}
        >
          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={() => nav(-1)}
              className='text-lemon-yellow/80 hover:text-lemon-yellow rounded px-2'
            >
              ‹
            </button>
            <div className='text-lemon-yellow text-base font-semibold'>
              {new Date(view.year, view.month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
            </div>
            <button
              type='button'
              onClick={() => nav(1)}
              className='text-lemon-yellow/80 hover:text-lemon-yellow rounded px-2'
            >
              ›
            </button>
          </div>

          <div className='mt-3 grid grid-cols-7 gap-2 text-center text-xs'>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((w, i) => (
              <div key={w + i} className={`${i >= 5 ? 'text-lavander' : 'text-lemon-yellow/70'} py-1`}>
                {w}
              </div>
            ))}
          </div>
          <div className='mt-2 grid grid-cols-7 place-items-center gap-2'>
            {matrix.map((c, idx) => {
              const col = idx % 7; // Monday-first (0..6)
              const isWeekend = col >= 5;
              const isSelected =
                c.currentMonth &&
                selected &&
                selected.year === view.year &&
                selected.month === view.month &&
                selected.day === c.day;
              if (!c.currentMonth || c.day === 0) {
                // Render blank to preserve grid alignment, without showing other months
                return <div key={idx} className='h-8 w-8' />;
              }
              const base = 'grid place-items-center h-8 w-8 rounded-full text-sm transition-colors';
              let cls = base;
              if (isSelected) {
                cls += ' bg-lemon-yellow text-dark-indigo font-semibold';
              } else {
                cls += ' cursor-pointer ' + (isWeekend ? 'text-lavander' : 'text-[#76C24D] hover:bg-lemon-yellow/10');
              }
              return (
                <button key={idx} type='button' onClick={() => selectDay(c.day)} className={cls}>
                  {c.day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
