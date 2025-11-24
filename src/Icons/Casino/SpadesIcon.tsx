import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SpadesIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 20 22'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M19.338 13.3794C19.338 16.2616 16.853 17.5819 15.1346 17.5828C13.2184 17.5828 11.7706 16.7149 10.9086 16.0062C11.0051 17.9948 11.4189 19.5017 13.0618 20.7179C13.3086 20.9007 13.1891 21.3445 12.882 21.3445H7.11798C6.81088 21.3445 6.69137 20.9007 6.93819 20.7179C8.58109 19.5017 8.99494 17.9948 9.09134 16.0062C8.2294 16.7144 6.78118 17.5838 4.86539 17.5828C3.14933 17.5828 0.661987 16.2616 0.661987 13.3794C0.661987 8.19153 4.26122 9.50314 9.74495 1.05315C9.86264 0.871803 10.1369 0.871799 10.2546 1.05314C15.7388 9.50315 19.338 8.19198 19.338 13.3794Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SpadesIcon;
