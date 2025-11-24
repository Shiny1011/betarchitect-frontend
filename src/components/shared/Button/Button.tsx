import { Ref } from 'react';

import { cn } from '@/lib/utils';

type BtnVariant = 'primary' | 'secondary' | 'secondary_soft' | 'link' | 'underline' | 'ghost';
type BtnSize = 'sm' | 'md' | 'lg' | 'link' | 'default';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  ref?: Ref<HTMLButtonElement>;
}

export const Button = ({ className, variant = 'primary', size = 'default', ref, ...props }: ButtonProps) => {
  const variantStyles = {
    primary:
      'bg-lemon-yellow text-dark-indigo hover:bg-lemon-yellow/90 active:translate-y-[1px] active:scale-95 md:font-semibold',
    secondary: 'bg-transparent border border-lemon-yellow text-lemon-yellow hover:bg-lemon-yellow/10',
    secondary_soft:
      'text-blue-indigo bg-lavander hover:bg-lavander/90 border border-lavander disabled:bg-lavander disabled:opacity-50 disabled:text-blue-indigo',
    link: 'text-lemon-yellow/50 hover:text-lemon-yellow underline-offset-2 hover:underline',
    underline: 'text-lemon-yellow underline',
    ghost: 'text-lemon-yellow hover:bg-lemon-yellow/5 active:bg-lemon-yellow/20',
  };

  const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg',
    link: 'px-0 text-sm',
    default: 'px-0',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200',
        'focus:ring-lemon-yellow/30 disabled:bg-dark-indigo disabled:text-lemon-yellow/50 disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};
