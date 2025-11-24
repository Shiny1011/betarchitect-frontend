'use client';

import React from 'react';

import FloatingInput from '@/components/UI/FloatingInput';
import { SearchIcon } from '@/Icons';

interface GameSearchProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

export function GameSearch({ value, onChange, onFocus }: GameSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    onFocus?.();
  };

  return (
    <FloatingInput
      label='Search'
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      leftAdornment={<SearchIcon size={22} />}
      className='max-md:border-none'
      containerBgClass='bg-transparent max-md:bg-[#0C1423]'
      leftPaddingClass='pl-10'
    />
  );
}
