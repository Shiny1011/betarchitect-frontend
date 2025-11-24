import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const WalletIcon: React.FC<IconProps> = ({ className, color = '#E0FE08', size = 18, opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 18 16'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M13.2488 0.078125C15.1511 0.078125 16.6932 1.62023 16.6932 3.52251V5.2447H14.971C13.259 5.24473 11.8711 6.63259 11.8711 8.34465C11.8711 10.0567 13.259 11.4446 14.971 11.4446H16.6932V12.4779C16.6932 14.3802 15.1511 15.9223 13.2488 15.9223H3.60454C1.70226 15.9223 0.160156 14.3802 0.160156 12.4779V3.52251C0.160156 1.62023 1.70226 0.078125 3.60454 0.078125H13.2488Z'
          fill={color}
        />
        <path
          d='M13.2488 8.34466C13.2488 7.33011 14.0713 6.50765 15.0858 6.50765H17.5133C17.6945 6.50765 17.8413 6.65452 17.8413 6.83569V9.85363C17.8413 10.0348 17.6945 10.1817 17.5133 10.1817H15.0858C14.0713 10.1817 13.2488 9.35921 13.2488 8.34466Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default WalletIcon;
