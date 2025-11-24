'use client';

import React, { useState } from 'react';

import { Button } from '@/components/shared';
import ConsentCheckbox from '@/components/UI/ConsentCheckbox';
import { DownArrowIcon } from '@/Icons';
import { cn } from '@/lib/utils';

interface ProviderFilterProps {
  providers?: string[];
  selectedProviders?: string[];
  onProviderChange?: (providers: string[]) => void;
}

const defaultProviders = [
  'Betsoft',
  'Red Tiger Gaming',
  'ELK Studios',
  'Thunderkick',
  'Playson',
  'Blueprint Gaming',
  'Amatic Industries',
  'Endorphina',
  'Relax Gaming',
  'Push Gaming',
  'Big Time Gaming',
  'Habanero',
  'Wazdan',
  'GameArt',
  'Spinomenal',
  'Booming Games',
  'NoLimit City',
  'iSoftBet',
  'Evoplay',
  'Pariplay',
  'Kalamba Games',
];

export function ProviderFilter({
  providers = defaultProviders,
  selectedProviders: initialSelectedProviders = [],
  onProviderChange,
}: ProviderFilterProps) {
  const [selectedProviders, setSelectedProviders] = useState<string[]>(initialSelectedProviders);
  const [isOpen, setIsOpen] = useState(false);

  const handleClearAll = () => {
    setSelectedProviders([]);
    onProviderChange?.([]);
  };

  const handleProviderToggle = (name: string, isChecked: boolean) => {
    const newProviders = isChecked ? [...selectedProviders, name] : selectedProviders.filter((n) => n !== name);
    setSelectedProviders(newProviders);
    onProviderChange?.(newProviders);
  };

  return (
    <div
      className={`mt-6 flex min-h-0 flex-1 flex-col max-md:mt-[8px] max-md:rounded-lg max-md:bg-slate-900 ${!isOpen ? 'max-md:h-[36px]' : ''}`}
    >
      <div
        className='flex cursor-pointer items-end justify-between max-md:mt-[8px] max-md:items-center max-md:px-4 md:cursor-default'
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='text-lemon-yellow text-[18px] font-semibold max-md:text-sm max-md:text-[#7B93C8]'>Provider</div>
        <Button
          type='button'
          variant='link'
          size='link'
          className='text-[14px] max-md:hidden'
          onClick={(e) => {
            e.stopPropagation();
            handleClearAll();
          }}
        >
          Clear All
        </Button>
        <Button variant='ghost' size='default' className='text-[#7B93C8] md:hidden' aria-label='Toggle provider'>
          <DownArrowIcon
            className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            color='#97B9FF80'
          />
        </Button>
      </div>
      <div
        className={cn(
          'mt-3 h-[430px] min-h-0 space-y-3 overflow-y-auto pr-2 transition-all duration-300',
          'max-md:px-4 max-md:pr-2',
          'md:max-h-none',
          isOpen ? 'max-h-[500px] pb-3' : 'max-h-0 md:max-h-none'
        )}
      >
        {providers.map((name, index) => {
          const id = `provider-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${index}`;
          const checked = selectedProviders.includes(name);
          return (
            <ConsentCheckbox
              key={id}
              id={id}
              checked={checked}
              onChange={(e) => handleProviderToggle(name, e.target.checked)}
            >
              {name}
            </ConsentCheckbox>
          );
        })}
      </div>
    </div>
  );
}
