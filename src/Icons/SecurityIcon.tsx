import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SecurityIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 20 24'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M10 8.80312C11.2552 8.80312 12.2727 9.82067 12.2727 11.0759C12.2727 12.331 11.2552 13.3486 10 13.3486C8.74481 13.3486 7.72727 12.331 7.72727 11.0759C7.72729 9.82067 8.74482 8.80312 10 8.80312Z'
          fill={color}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.96822 1.05277C8.83795 -0.0540483 11.1621 -0.0540482 13.0318 1.05277L17.6642 3.79425C19.1122 4.65136 20 6.20967 20 7.89226V14.6732C19.9999 16.1509 19.3138 17.545 18.1428 18.4462L12.1777 23.0361C10.8939 24.024 9.10611 24.024 7.82227 23.0361L1.85724 18.4462C0.686199 17.545 0.000125921 16.1509 0 14.6732V7.89226C0 6.20967 0.887849 4.65136 2.33576 3.79425L6.96822 1.05277ZM10 6.5304C7.48963 6.5304 5.45456 8.56548 5.45455 11.0759C5.45455 13.2749 7.0162 15.1087 9.09091 15.5299V17.4395C9.09091 17.9416 9.49792 18.3486 10 18.3486C10.5021 18.3486 10.9091 17.9416 10.9091 17.4395V15.5299C12.9838 15.1087 14.5455 13.2749 14.5455 11.0759C14.5454 8.56548 12.5104 6.5304 10 6.5304Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SecurityIcon;
