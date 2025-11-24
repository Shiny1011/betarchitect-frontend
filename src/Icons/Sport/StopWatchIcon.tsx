import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const StopWatchIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 18 22'
        fill='none'
        opacity={opacity}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9 3.5C11.2269 3.5 13.2636 4.31048 14.835 5.65039L15 5.36621C15.2761 4.88796 15.8879 4.72397 16.3662 5C16.8445 5.27614 17.0086 5.88792 16.7324 6.36621L16.2598 7.18359C17.3527 8.67345 18 10.5107 18 12.5C18 17.4706 13.9706 21.5 9 21.5C4.02944 21.5 2.07966e-07 17.4706 0 12.5C9.03846e-08 10.4322 0.698784 8.52848 1.87109 7.00879L1.5 6.36621C1.22386 5.88792 1.38792 5.27614 1.86621 5C2.34448 4.72397 2.95631 4.88796 3.23242 5.36621L3.32031 5.51855C4.86942 4.25676 6.84627 3.5 9 3.5ZM9 5.5C5.13401 5.5 2 8.63401 2 12.5H9V5.5Z'
          fill={color}
        />
        <path
          d='M12 0.5C12.5523 0.5 13 0.947715 13 1.5C13 2.05228 12.5523 2.5 12 2.5H6C5.44772 2.5 5 2.05228 5 1.5C5 0.947715 5.44772 0.5 6 0.5H12Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default StopWatchIcon;
