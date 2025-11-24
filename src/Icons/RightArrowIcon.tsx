import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const RightArrowIcon: React.FC<IconProps> = ({
  className,
  size = 20,
  color = '#E0FE08',
  opacity = 1,
}): ReactElement => {
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
          d='M13.6001 11.5999L0.400098 19.5999L0.400098 16.3999L10.9607 9.9999L0.400098 3.5999L0.400098 0.399903L13.6001 8.3999L13.6001 11.5999Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default RightArrowIcon;
