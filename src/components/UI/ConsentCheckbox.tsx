'use client';

import React from 'react';

interface ConsentCheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function ConsentCheckbox({
  id = 'consent_checkbox',
  checked,
  onChange,
  children,
  className,
}: ConsentCheckboxProps) {
  return (
    <label className={`text-lemon-yellow flex items-center gap-2 text-sm ${className ?? ''}`}>
      <div className='relative flex cursor-pointer items-center gap-3'>
        <input
          type='checkbox'
          id={id}
          checked={checked}
          onChange={onChange}
          className='peer border-lemon-yellow checked:bg-lemon-yellow relative h-5 w-5 shrink-0 appearance-none rounded-sm border bg-transparent transition-all checked:border-transparent'
        />
        <label htmlFor={id} className='cursor-pointer'>
          {children}
        </label>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='absolute ml-[3px] h-3 w-3 opacity-0 transition-all peer-checked:opacity-100'
          width='9'
          height='12'
          viewBox='0 0 9 12'
          fill='none'
        >
          <path
            d='M5.71289 11.7144H3.57031L0.712891 7.42822H2.85645L4.1543 9.37646L6.42773 0.285645H8.57031L5.71289 11.7144Z'
            fill='#0C1423'
          />
        </svg>
      </div>
    </label>
  );
}
