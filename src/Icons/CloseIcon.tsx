import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const CloseIcon: React.FC<IconProps> = ({ className, size = 15, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 15 13'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M7.69824 5.66602L12.041 0.989258H14.498L8.92676 6.98926L14.498 12.9893H12.041L7.69727 8.3125L3.35547 12.9893H0.898438L6.46875 6.98926L0.897461 0.989258H3.35547L7.69824 5.66602Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
