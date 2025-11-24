'use client';

import React, { useState } from 'react';

interface FloatingInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  name?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  leftPaddingClass?: string;
  rightPaddingClass?: string;
  readOnly?: boolean;
  disabled?: boolean;
  colorVariant?: 'lemon' | 'lavender';
  containerBgClass?: string;
  placeholder?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  error,
  helperText,
  className,
  inputClassName,
  leftAdornment,
  rightAdornment,
  placeholder,
  leftPaddingClass = '',
  rightPaddingClass = 'pr-10',
  readOnly = false,
  disabled = false,
  colorVariant = 'lemon',
  containerBgClass = 'bg-transparent',
  inputRef,
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || (!!value && value.length > 0);

  const border = colorVariant === 'lavender' ? 'border-[#22355A]' : error ? 'border-red-500' : 'border-lemon-yellow/40';
  const ring =
    colorVariant === 'lavender'
      ? 'focus-within:ring-transparent'
      : error
        ? 'focus-within:ring-red-500'
        : 'focus-within:ring-lemon-yellow';
  const labelColor = colorVariant === 'lavender' ? 'text-lavander/50' : error ? 'text-red-500' : 'text-lemon-yellow/50';

  return (
    <div className={className}>
      <div
        className={`relative h-12 w-full rounded-[8px] border ${border} ${containerBgClass} px-3 ${rightPaddingClass} text-sm ${ring} focus-within:ring-1`}
      >
        <label
          className={`pointer-events-none absolute ${leftAdornment ? 'left-10' : 'left-3'} transform transition-all duration-200 ${labelColor} ${
            active ? 'top-1 left-0 text-[10px] md:text-[12px]' : 'top-1/2 -translate-y-1/2 text-[12px] md:text-[16px]'
          }`}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          aria-invalid={error}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => {
            onFocus?.();
            setFocused(true);
          }}
          placeholder={placeholder}
          className={`${inputClassName} text-lemon-yellow absolute inset-0 h-full w-full bg-transparent ${
            leftAdornment ? 'pl-10' : ''
          } px-3 pt-5 ${leftPaddingClass} ${rightPaddingClass} placeholder-transparent outline-none`}
        />
        {leftAdornment && <div className='absolute top-1/2 left-3 -translate-y-1/2'>{leftAdornment}</div>}
        {rightAdornment && <div className='absolute top-1/2 right-3 -translate-y-1/2'>{rightAdornment}</div>}
      </div>
      {helperText && (
        <div className={`${error ? 'text-red-500' : 'text-lemon-yellow/70'} mt-2 text-xs`}>{helperText}</div>
      )}
    </div>
  );
}
