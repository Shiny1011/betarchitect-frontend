import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const PlayIcon: React.FC<IconProps> = ({ className, size = 24, color = '#334F84', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 21 22'
        fill='none'
        opacity={opacity}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.4999 0.583496C16.2529 0.583496 20.9166 5.2472 20.9166 11.0002C20.9166 16.7531 16.2529 21.4168 10.4999 21.4168C4.74695 21.4168 0.083252 16.7531 0.083252 11.0002C0.083252 5.2472 4.74695 0.583496 10.4999 0.583496ZM8.81779 7.09635C8.26244 6.79107 7.58325 7.19256 7.58325 7.82633V14.174C7.58325 14.8078 8.26244 15.2093 8.81779 14.904L14.5893 11.7301C15.1645 11.4135 15.1645 10.5869 14.5893 10.2702L8.81779 7.09635Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default PlayIcon;
