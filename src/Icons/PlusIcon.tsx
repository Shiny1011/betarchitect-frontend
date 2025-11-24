import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const PlusIcon: React.FC<IconProps> = ({ className, size = 14, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 14 14'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M7.69727 6.2959L14 6.29688V7.69727L7.69727 7.69629V14H6.29688V7.69629H0V6.2959H6.29688V0H7.69727V6.2959Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default PlusIcon;
