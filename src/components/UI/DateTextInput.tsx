'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { DATE_PLACE_HOLDER } from '@/constants';
import { CalendarIcon } from '@/Icons';

import Calendar from './Calendar';

interface DateTextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  withCalendar?: boolean;
}

function formatFromDigits(digits: string) {
  const raw = digits.replace(/\D/g, '');
  const padded = (raw + '00000000').slice(0, 8);
  const dd = padded.slice(0, 2);
  const mm = padded.slice(2, 4);
  const yyyy = padded.slice(4, 8);
  return `${dd} / ${mm} / ${yyyy}`;
}

export default function DateTextInput({
  value,
  onChange,
  className,
  placeholder = DATE_PLACE_HOLDER,
  name,
  disabled = false,
  withCalendar,
}: DateTextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [digits, setDigits] = useState<string>(
    String(value ?? '')
      .replace(/\D/g, '')
      .slice(0, 8)
  );
  const display = digits.length ? formatFromDigits(digits) : '';
  const [caretPos, setCaretPos] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [calendarView, setCalendarView] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const slotPositions = [0, 1, 5, 6, 10, 11, 12, 13];
  const nextSlotPos = (len: number) => slotPositions[len] ?? (display.length || placeholder.length);

  useEffect(() => {
    const incoming = String(value ?? '')
      .replace(/\D/g, '')
      .slice(0, 8);
    // Only update if parent value truly changed to avoid caret jumps
    if (incoming !== digits) {
      setDigits(incoming);
    }
  }, [value]);

  useLayoutEffect(() => {
    if (caretPos == null) return;
    const el = inputRef.current;
    if (!el) return;
    try {
      el.setSelectionRange(caretPos, caretPos);
    } catch {}
  }, [display, caretPos]);

  // Handle clicks outside to close calendar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCalendar]);

  const commit = (next: string) => {
    setDigits(next);
    if (next.length === 0) {
      onChange?.('');
    } else {
      // Report only typed digits to parent to avoid premature padding
      onChange?.(next);
    }
  };

  const handleCalendarNavigate = (delta: number) => {
    const next = new Date(calendarView.year, calendarView.month + delta, 1);
    setCalendarView({ year: next.getFullYear(), month: next.getMonth() });
  };

  const handleDateSelect = (day: number, month: number, year: number) => {
    const dd = String(day).padStart(2, '0');
    const mm = String(month + 1).padStart(2, '0'); // month is 0-based
    const yyyy = String(year);
    const dateDigits = dd + mm + yyyy;
    commit(dateDigits);
    setCaretPos(nextSlotPos(dateDigits.length));
    setShowCalendar(false);
  };

  // Parse current selected date for calendar highlighting
  const selectedDate = useMemo(() => {
    if (digits.length >= 8) {
      const dd = parseInt(digits.slice(0, 2), 10);
      const mm = parseInt(digits.slice(2, 4), 10) - 1; // 0-based
      const yyyy = parseInt(digits.slice(4, 8), 10);
      return { day: dd, month: mm, year: yyyy };
    }
    return null;
  }, [digits]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    const key = e.key;
    if (key >= '0' && key <= '9') {
      e.preventDefault();
      if (digits.length >= 8) return;
      const next = (digits + key).slice(0, 8);
      commit(next);
      setCaretPos(nextSlotPos(next.length));
      return;
    }
    if (key === 'Backspace') {
      e.preventDefault();
      if (digits.length === 0) return;
      const next = digits.slice(0, -1);
      commit(next);
      setCaretPos(nextSlotPos(next.length));
      return;
    }
    // Allow navigation keys; block other editing keys to keep formatting stable
    const allowed = ['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (allowed.includes(key)) return;
    // Prevent inserting other characters
    e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    const onlyDigits = text.replace(/\D/g, '').slice(0, 8);
    commit(onlyDigits);
    setCaretPos(nextSlotPos(onlyDigits.length));
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const ie = (e as unknown as { nativeEvent: InputEvent }).nativeEvent;
    const type = ie?.inputType;
    const data = ie?.data ?? '';
    // Handle mobile input where keydown may not fire
    if (type === 'insertText') {
      if (/^[0-9]$/.test(data)) {
        e.preventDefault();
        if (digits.length >= 8) return;
        const next = (digits + data).slice(0, 8);
        commit(next);
        setCaretPos(nextSlotPos(next.length));
      } else {
        // Block non-digit inserts
        e.preventDefault();
      }
    } else if (type === 'deleteContentBackward') {
      e.preventDefault();
      if (digits.length === 0) return;
      const next = digits.slice(0, -1);
      commit(next);
      setCaretPos(nextSlotPos(next.length));
    }
  };

  return (
    <div className={`relative w-full`} ref={containerRef}>
      <span className='pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center'>
        <CalendarIcon size={22} color={display.length ? '#E0FE08' : isFocused ? '#E0FE08' : '#7C9224'} />
      </span>
      <input
        type='text'
        name={name}
        value={display}
        onChange={() => {}}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBeforeInput={handleBeforeInput}
        onFocus={() => {
          setCaretPos(nextSlotPos(digits.length));
          setShowCalendar(true);
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        disabled={disabled}
        inputMode='numeric'
        aria-label='Date'
        placeholder={placeholder}
        ref={inputRef}
        className={`h-12 w-full rounded-[8px] border bg-transparent pr-3 pl-12 text-sm transition-all duration-300 ease-in-out outline-none ${
          isFocused
            ? 'border-lemon-yellow text-lemon-yellow focus:ring-lemon-yellow'
            : 'border-lemon-yellow/40 text-lemon-yellow focus:border-lemon-yellow focus:text-lemon-yellow focus:ring-lemon-yellow'
        } ${className ?? ''}`}
      />

      {withCalendar && (
        <div
          className={`absolute left-0 z-50 mt-2 transform transition-all duration-300 ease-in-out ${
            showCalendar
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
          }`}
        >
          <Calendar
            year={calendarView.year}
            month={calendarView.month}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onNavigate={handleCalendarNavigate}
          />
        </div>
      )}
    </div>
  );
}
