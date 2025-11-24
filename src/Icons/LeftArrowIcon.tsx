import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const LeftArrowIcon: React.FC<IconProps> = ({ className, size = 20, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 14 20'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M0.399902 8.4001L13.5999 0.400097L13.5999 3.6001L3.03926 10.0001L13.5999 16.4001L13.5999 19.6001L0.399902 11.6001L0.399902 8.4001Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default LeftArrowIcon;
