'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface ConsentRadioProps {
  id: string;
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function ConsentRadio({ id, name, label, checked, onChange, className, disabled }: ConsentRadioProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        `text-lemon-yellow/50 flex cursor-pointer items-center gap-[10px] p-[10px] text-sm ${className || ''}`
      )}
    >
      <span className='mt-0.5 grid place-items-center'>
        <input
          disabled={disabled}
          type='radio'
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className={`peer col-start-1 row-start-1 h-[14px] w-[14px] shrink-0 appearance-none rounded-full border ${
            checked ? 'border-lemon-yellow' : 'border-lemon-yellow/50'
          }`}
        />
        <span className='peer-checked:bg-lemon-yellow col-start-1 row-start-1 h-[6px] w-[6px] rounded-full' />
      </span>
      <span className={`${checked ? 'text-lemon-yellow' : 'text-lemon-yellow/50'}`}>{label}</span>
    </label>
  );
}
