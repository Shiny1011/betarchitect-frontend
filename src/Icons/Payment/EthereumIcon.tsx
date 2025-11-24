import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const EthereumIcon: React.FC<IconProps> = ({ className, size = 16, opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 10 17'
        fill='none'
        opacity={opacity}
      >
        <path d='M4.99856 0.5L4.8922 0.864589V11.4441L4.99856 11.5512L9.86775 8.64836L4.99856 0.5Z' fill='#343434' />
        <path d='M4.99856 0.5L0.129395 8.64836L4.99856 11.5512L4.99858 6.41624L4.99856 0.5Z' fill='#8C8C8C' />
        <path
          d='M4.99855 12.4811L4.93862 12.5547V16.3234L4.99855 16.5L9.87063 9.5797L4.99855 12.4811Z'
          fill='#3C3C3B'
        />
        <path d='M4.99855 16.5V12.4811L0.129395 9.57961L4.99855 16.5Z' fill='#8C8C8C' />
        <path d='M4.99856 11.5512L9.86775 8.64836L4.99858 6.41624L4.99856 11.5512Z' fill='#141414' />
        <path d='M0.129395 8.64836L4.99856 11.5512L4.99858 6.41624L0.129395 8.64836Z' fill='#393939' />
      </svg>
    </div>
  );
};

export default EthereumIcon;
