'use client';

import { useState } from 'react';

import { Button } from '@/components/shared';
import { DownArrowIcon } from '@/Icons';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories?: string[];
  selectedCategories?: string[];
  onCategoryChange?: (category: string) => void;
}

const defaultCategories = [
  'New',
  'Popular',
  'Live Dealer',
  'Table',
  'Live Casino',
  'Instant',
  'Bonus Buy',
  'Jackpots',
  'Slots',
];

export function CategoryFilter({
  categories = defaultCategories,
  selectedCategories = [],
  onCategoryChange,
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`mt-6 max-md:mt-3 max-md:rounded-lg max-md:bg-slate-900 ${!isOpen ? 'max-md:h-[36px]' : ''}`}>
      <div
        className={cn(
          'text-lemon-yellow flex cursor-pointer items-center justify-between text-[18px] font-semibold',
          'max-md:h-[36px] max-md:px-4 max-md:text-sm max-md:text-[#7B93C8]',
          'md:cursor-default'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Category</span>
        <Button variant='ghost' size='default' className='text-lavander/50 md:hidden' aria-label='Toggle category'>
          <DownArrowIcon
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            color='#97B9FF80'
          />
        </Button>
      </div>
      <div
        className={`flex flex-wrap gap-[10px] overflow-hidden transition-all duration-300 max-md:px-4 md:mt-[18px] md:max-h-none ${
          isOpen ? 'mt-[18px] max-h-[500px] pb-3' : 'max-h-0 md:max-h-none'
        }`}
      >
        {categories.map((tag) => (
          <div
            key={tag}
            className='text-lavander/50 md:bg-dark-indigo cursor-pointer rounded-[8px] bg-slate-800 p-2 text-xs font-bold'
            onClick={() => onCategoryChange?.(tag)}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
