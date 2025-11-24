'use client';

import { useEffect, useRef, useState } from 'react';

import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';

import { cn, debounce } from '@/lib/utils';

export interface SearchResult {
  id: string | number;
  label: string;
  value: string;
}

type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type InputFocusHandler = React.FocusEventHandler<HTMLInputElement>;

interface SearchBarProps<T extends SearchResult> {
  label: string;
  placeholder?: string;
  onSearch: (query: string) => void | Promise<void>;
  results?: T[];
  onSelect: (item: T) => void;
  isLoading?: boolean;
  debounceMs?: number;
  noResultsText?: string;
  colorVariant?: 'lemon' | 'lavender';
  className?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  onChange?: InputChangeHandler;
  onBlur?: InputFocusHandler;
  onFocus?: InputFocusHandler;
  value?: string;
  name?: string;
}

export function SearchBar<T extends SearchResult>(props: SearchBarProps<T>) {
  const {
    label,
    placeholder,
    onSearch,
    results = [],
    onSelect,
    isLoading = false,
    debounceMs = 300,
    noResultsText = 'No results found',
    colorVariant = 'lemon',
    className,
    leftAdornment,
    rightAdornment,
    error,
    helperText,
    onChange,
    onBlur,
    onFocus,
    value: externalValue,
    name,
  } = props;

  const [selected, setSelected] = useState<T | null>(null);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const debouncedSearch = useRef(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, debounceMs)
  ).current;

  const inputValue = externalValue !== undefined ? externalValue : query;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (externalValue === undefined) {
      setQuery(value);
    }

    onChange?.(e);

    if (value.trim()) {
      debouncedSearch(value.trim());
    }
  };

  const handleSelect = (item: T | null) => {
    setSelected(item);
    if (item) {
      onSelect(item);
      if (externalValue === undefined) {
        setQuery(item.label);
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const active = focused || (!!inputValue && inputValue.length > 0);

  const showResults = inputValue.trim().length > 0;
  const hasResults = results.length > 0;

  // Scroll inside dropdown
  useEffect(() => {
    if (!showResults) return;

    const handleScrollEvent = (e: Event) => {
      const target = e.target as HTMLElement;
      const inPortal = target.closest('[data-headlessui-portal]');
      const scrollableElement = target.closest('[role="listbox"]');

      if (inPortal && scrollableElement) {
        e.stopPropagation();
      }
    };

    // Add handlers for wheel (desktop) and touchmove (mobile)
    document.addEventListener('wheel', handleScrollEvent, { passive: false, capture: true } as AddEventListenerOptions);
    document.addEventListener('touchmove', handleScrollEvent, {
      passive: false,
      capture: true,
    } as AddEventListenerOptions);

    return () => {
      document.removeEventListener('wheel', handleScrollEvent, { capture: true } as AddEventListenerOptions);
      document.removeEventListener('touchmove', handleScrollEvent, { capture: true } as AddEventListenerOptions);
    };
  }, [showResults]);

  return (
    <div className={className}>
      <Combobox value={selected} onChange={handleSelect}>
        <div
          className={cn(
            'relative h-12 w-full rounded-[8px] border bg-transparent px-3 text-sm focus-within:ring-1',
            colorVariant === 'lavender'
              ? 'border-[#22355A] focus-within:ring-transparent'
              : error
                ? 'border-red-500 focus-within:ring-red-500'
                : 'border-lemon-yellow/40 focus-within:ring-lemon-yellow'
          )}
        >
          <label
            className={cn(
              'pointer-events-none absolute transform transition-all duration-200',
              leftAdornment ? 'left-10' : 'left-3',
              colorVariant === 'lavender' ? 'text-lavander/50' : error ? 'text-red-500' : 'text-lemon-yellow/50',
              active ? 'top-1 text-[12px]' : 'top-1/2 -translate-y-1/2 text-[16px]'
            )}
          >
            {label}
          </label>

          {leftAdornment && <div className='absolute top-1/2 left-3 -translate-y-1/2'>{leftAdornment}</div>}

          <ComboboxInput
            name={name}
            className={cn(
              'absolute inset-0 h-full w-full bg-transparent px-3 pt-5 placeholder-transparent outline-none',
              leftAdornment ? 'pl-10' : '',
              rightAdornment ? 'pr-10' : '',
              colorVariant === 'lavender' ? 'text-lavander' : 'text-lemon-yellow'
            )}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            displayValue={() => inputValue}
          />

          {rightAdornment && <div className='absolute top-1/2 right-3 -translate-y-1/2'>{rightAdornment}</div>}
        </div>

        {showResults && (
          <ComboboxOptions
            anchor='bottom start'
            modal={false}
            className={cn(
              'pointer-events-auto z-[99999] max-h-[240px] w-[var(--input-width)] overflow-auto rounded-[8px] border bg-[#0F1A2E] shadow-lg [--anchor-gap:4px]',
              colorVariant === 'lavender' ? 'border-[#22355A]' : 'border-lemon-yellow/40'
            )}
          >
            {isLoading ? (
              <div className='text-lemon-yellow/50 px-3 py-4 text-center text-sm'>Loading...</div>
            ) : hasResults ? (
              results.map((item) => (
                <ComboboxOption
                  key={item.id}
                  value={item}
                  className={cn(
                    'cursor-pointer px-3 py-2.5 text-sm transition-colors',
                    colorVariant === 'lavender'
                      ? 'text-lavander data-focus:text-lavander data-focus:bg-[#22355A]/30'
                      : 'text-lemon-yellow data-focus:bg-lemon-yellow/10 data-focus:text-lemon-yellow'
                  )}
                >
                  {item.label}
                </ComboboxOption>
              ))
            ) : (
              <div className='text-lemon-yellow/50 px-3 py-4 text-center text-sm'>{noResultsText}</div>
            )}
          </ComboboxOptions>
        )}
      </Combobox>

      {helperText && (
        <div className={cn('mt-2 text-xs', error ? 'text-red-500' : 'text-lemon-yellow/70')}>{helperText}</div>
      )}
    </div>
  );
}
