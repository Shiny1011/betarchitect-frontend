'use client';

import React, { useMemo } from 'react';

interface CalendarProps {
  year: number;
  month: number;
  selectedDate?: { day: number; month: number; year: number } | null;
  onDateSelect: (day: number, month: number, year: number) => void;
  onNavigate: (delta: number) => void;
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

export default function Calendar({
  year,
  month,
  selectedDate,
  onDateSelect,
  onNavigate,
  className = '',
}: CalendarProps) {
  const matrix = useMemo(() => getMonthMatrix(year, month), [year, month]);

  const selectDay = (d: number) => {
    onDateSelect(d, month, year);
  };

  return (
    <div className={`bg-blue-indigo w-[320px] rounded-[14px] border border-[#22355A] p-4 shadow-xl ${className}`}>
      <div className='flex items-center justify-between'>
        <button
          type='button'
          onClick={() => onNavigate(-1)}
          className='text-lemon-yellow/80 hover:text-lemon-yellow rounded px-2'
        >
          ‹
        </button>
        <div className='text-lemon-yellow text-base font-semibold'>
          {new Date(year, month).toLocaleString(undefined, { month: 'long', year: 'numeric' })}
        </div>
        <button
          type='button'
          onClick={() => onNavigate(1)}
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
            selectedDate &&
            selectedDate.year === year &&
            selectedDate.month === month &&
            selectedDate.day === c.day;
          if (!c.currentMonth || c.day === 0) {
            // Render blank to preserve grid alignment, without showing other months
            return <div key={idx} className='h-8 w-8' />;
          }
          const base = 'grid place-items-center h-8 w-8 rounded-full text-sm transition-colors';
          let cls = base;
          if (isSelected) {
            cls += ' bg-lemon-yellow text-dark-indigo font-semibold';
          } else {
            cls +=
              ' cursor-pointer ' +
              (isWeekend
                ? 'text-lavander hover:bg-lavander hover:text-blue-indigo'
                : 'text-lemon-yellow/50 hover:bg-lemon-yellow hover:text-dark-indigo');
          }
          return (
            <button key={idx} type='button' onClick={() => selectDay(c.day)} className={cls}>
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
