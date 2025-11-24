import React, { useEffect, useRef, useState } from 'react';

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface DropdownSelectProps {
  label?: string; // small label above the control
  helperLabel?: string; // inline prefix label inside the button, e.g. "Currency:"
  value: string;
  items: DropdownItem[];
  onChange: (value: string) => void;
  disabled?: boolean;

  // Customization (Tailwind class overrides)
  className?: string; // wrapper
  roundedClass?: string; // e.g. 'rounded-[8px]'
  buttonHeightClass?: string; // e.g. 'h-12'
  textClass?: string; // e.g. 'text-lemon-yellow'
  bgClass?: string; // button background, e.g. 'bg-dark-indigo'
  borderClass?: string; // e.g. 'border-[#22355A]'
  dropdownBgClass?: string; // outer dropdown bg, e.g. 'bg-blue-indigo'
  listBgClass?: string; // list area bg, e.g. 'bg-dark-indigo'
  listMaxHeightClass?: string; // e.g. 'max-h-[200px]'
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  helperLabel,
  value,
  items,
  onChange,
  disabled = false,
  className = '',
  roundedClass = 'rounded-[8px]',
  buttonHeightClass = 'h-12',
  textClass = 'text-lemon-yellow',
  bgClass = 'bg-dark-indigo',
  borderClass = 'border-[#22355A]',
  dropdownBgClass = 'bg-blue-indigo',
  listBgClass = 'bg-dark-indigo',
  listMaxHeightClass = 'max-h-[200px]',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!open) return;
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open]);

  const selected = items.find((i) => i.value === value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && <div className={`${textClass}/80 mb-1 text-sm`}>{label}</div>}
      <button
        type='button'
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`${textClass} flex ${buttonHeightClass} w-full items-center justify-between ${roundedClass} ${
          open ? 'rounded-b-[0px] border-b-0' : ''
        } ${bgClass} border ${borderClass} px-4 text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60`}
        aria-expanded={open}
      >
        <span className='flex items-center gap-2'>
          {selected?.icon}
          <span>
            {helperLabel && <span className={`${textClass}/60`}>{helperLabel}&nbsp;</span>}
            {selected?.label ?? value}
          </span>
        </span>
        <span className={`${textClass}/70`}>{open ? '▴' : '▾'}</span>
      </button>

      {/* CSS-only transition dropdown */}
      <div
        className={`${dropdownBgClass} absolute z-50 w-full overflow-hidden ${roundedClass} ${
          open ? 'rounded-t-[0px] border-t-0' : ''
        } border ${borderClass} transition-[border] duration-200`}
      >
        <div
          className={`${listBgClass} ${
            open ? `${listMaxHeightClass} pointer-events-auto opacity-100` : 'pointer-events-none max-h-0 opacity-0'
          } overflow-auto p-3 transition-all duration-300 ease-out`}
        >
          {items.map((item) => (
            <button
              key={item.value}
              type='button'
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                onChange(item.value);
                setOpen(false);
              }}
              className={`${textClass}/80 hover:bg-lemon-yellow/10 flex h-10 w-full items-center gap-2 rounded px-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                value === item.value ? 'bg-[#13203D]' : ''
              }`}
            >
              {item.icon}
              <span className={`${textClass} text-sm`}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
