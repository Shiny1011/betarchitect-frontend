import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const MenuIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 16'
        fill='none'
        opacity={opacity}
      >
        <path d='M24 16H0V12.7998H24V16ZM24 9.59961H0V6.40039H24V9.59961ZM24 3.2002H0V0H24V3.2002Z' fill={color} />
      </svg>
    </div>
  );
};

export default MenuIcon;
