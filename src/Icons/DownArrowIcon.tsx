import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const DownArrowIcon: React.FC<IconProps> = ({ className, size = 10, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 10 7'
        fill='none'
        opacity={opacity}
      >
        <path d='M1 1L5 5L9 1' stroke={color} strokeWidth='2' />
      </svg>
    </div>
  );
};

export default DownArrowIcon;
