import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const VSVerticalIcon: React.FC<IconProps> = ({
  className,
  size = 15,
  color = '#97B9FF',
  opacity = 1,
}): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 12 15'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M5.95702 5.0127C5.01151 5.20461 4.29988 6.04071 4.29988 7.04286C4.29988 8.04495 5.01159 8.88024 5.95702 9.07221V14.0857H1.81417C1.35656 14.0857 0.985596 13.7148 0.985596 13.2571V0.828571C0.985596 0.370964 1.35656 1.66816e-08 1.81417 0H5.95702V5.0127Z'
          fill={color}
        />
        <path
          d='M10.9285 0C11.3861 0 11.757 0.370964 11.757 0.828571V13.2571C11.757 13.7148 11.3861 14.0857 10.9285 14.0857H6.7856V9.07221C7.73103 8.88024 8.44274 8.04495 8.44274 7.04286C8.44274 6.04071 7.73111 5.20461 6.7856 5.0127V0H10.9285Z'
          fill={color}
        />
        <path
          d='M7.61417 7.04286C7.61417 7.72927 7.05772 8.28571 6.37131 8.28571C5.6849 8.28571 5.12845 7.72927 5.12845 7.04286C5.12845 6.35645 5.6849 5.8 6.37131 5.8C7.05772 5.8 7.61417 6.35645 7.61417 7.04286Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default VSVerticalIcon;
