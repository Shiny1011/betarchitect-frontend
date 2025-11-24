import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const XIcon: React.FC<IconProps> = ({ className, size = 18, color = '#97B9FF' }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 23 23' fill='none'>
        <path
          d='M13.6904 9.74005L22.254 0H20.2254L12.7865 8.45542L6.8494 0H0L8.97997 12.7873L0 23H2.0286L9.87927 14.0689L16.1506 23H23M2.76077 1.49682H5.87727L20.2239 21.5767H17.1066'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default XIcon;
