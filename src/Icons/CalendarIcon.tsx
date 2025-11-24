import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const CalendarIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 23 22'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M22.9565 19.1304C22.9565 20.7153 21.6718 22 20.087 22H2.86957C1.28475 22 0 20.7153 0 19.1304V8.6087H22.9565V19.1304Z'
          fill={color}
        />
        <path
          d='M17.6957 0C18.4881 0 19.1304 0.642374 19.1304 1.43478V2.86957H20.087C21.6718 2.86957 22.9565 4.15431 22.9565 5.73913V6.69565H0V5.73913C1.66259e-07 4.15431 1.28475 2.86957 2.86957 2.86957H3.82609V1.43478C3.82609 0.642374 4.46846 0 5.26087 0C6.05328 0 6.69565 0.642374 6.69565 1.43478V2.86957H16.2609V1.43478C16.2609 0.642374 16.9032 0 17.6957 0Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CalendarIcon;
