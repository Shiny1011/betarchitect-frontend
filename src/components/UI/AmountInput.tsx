'use client';

import React from 'react';

interface AmountInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export default function AmountInput({
  label,
  type = 'text',
  value,
  onChange,
  error = false,
  helperText,
  className,
}: AmountInputProps) {
  const border = error ? 'border-red-500' : 'border-lemon-yellow';
  const ring = error ? 'focus-within:ring-red-500' : 'focus-within:ring-lemon-yellow';

  return (
    <div className={className}>
      <div className='text-lemon-yellow/50 leading-full mb-3 text-xs font-medium'>{label}</div>
      <div className={`relative h-12 w-full rounded-[12px] border ${border} bg-[#142341] px-4 ${ring}`}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className='text-lemon-yellow h-full w-full bg-transparent text-[18px] font-semibold outline-none'
          aria-invalid={error}
        />
      </div>
      {helperText && (
        <div className={`${error ? 'text-red-500' : 'text-lemon-yellow/70'} mt-2 text-xs`}>{helperText}</div>
      )}
    </div>
  );
}
