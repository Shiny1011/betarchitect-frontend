import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SearchIcon: React.FC<IconProps> = ({ className, size = 25, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 25 26'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M19.0506 19.0608C22.9558 15.1556 22.9558 8.82392 19.0506 4.91868C15.1453 1.01344 8.81367 1.01344 4.90842 4.91868C1.00318 8.82392 1.00318 15.1556 4.90842 19.0608C8.81367 22.9661 15.1453 22.9661 19.0506 19.0608ZM19.0506 19.0608L24 24.0105'
          stroke={color}
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
};

export default SearchIcon;
