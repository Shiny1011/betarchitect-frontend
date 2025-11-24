import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const TranslateIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 26 22'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M12.8352 22L17.8402 8.8H20.1502L25.1552 22H22.8452L21.6627 18.645H16.3277L15.1452 22H12.8352ZM4.14522 18.7L2.60521 17.16L8.16021 11.605C7.51855 10.9633 6.93628 10.23 6.41341 9.405C5.89055 8.58 5.40948 7.645 4.97021 6.6H7.28021C7.64688 7.315 8.01355 7.93833 8.38021 8.47C8.74688 9.00167 9.18688 9.53333 9.70022 10.065C10.3052 9.46 10.9333 8.6119 11.5845 7.5207C12.2357 6.4295 12.7259 5.38927 13.0552 4.4H0.845215V2.2H8.54522V0H10.7452V2.2H18.4452V4.4H15.2552C14.8702 5.72 14.2927 7.07667 13.5227 8.47C12.7527 9.86333 11.9919 10.9267 11.2402 11.66L13.8802 14.355L13.0552 16.61L9.70022 13.1725L4.14522 18.7ZM17.0152 16.72H20.9752L18.9952 11.11L17.0152 16.72Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default TranslateIcon;
