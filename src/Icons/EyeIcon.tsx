import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

interface EyeIconProps {
  open?: boolean;
}

const EyeIcon: React.FC<EyeIconProps & IconProps> = ({
  className,
  size = 24,
  color = '#E0FE08',
  open = false,
  opacity = 1,
}): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke={color}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        opacity={opacity}
      >
        {open ? (
          <g>
            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
            <circle cx='12' cy='12' r='3' />
          </g>
        ) : (
          <g>
            <path d='M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.76 21.76 0 0 1 6.06-6.06' />
            <path d='M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.76 21.76 0 0 1-3.87 5.26' />
            <path d='M14.12 14.12a3 3 0 1 1-4.24-4.24' />
            <line x1='1' y1='1' x2='23' y2='23' />
          </g>
        )}
      </svg>
    </div>
  );
};

export default EyeIcon;
