import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const JoyStickIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
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
          d='M18.1052 17.9474C18.7447 17.9474 19.2631 18.4658 19.2631 19.1053V20.8421C19.2631 21.4816 18.7447 22 18.1052 22H1.89471C1.25522 22 0.736816 21.4816 0.736816 20.8421V19.1053C0.736816 18.4658 1.25522 17.9474 1.89471 17.9474H18.1052Z'
          fill={color}
        />
        <path
          d='M9.99997 0C12.5579 0 14.6316 2.07363 14.6316 4.63158C14.6316 6.78966 13.1554 8.60253 11.1579 9.11672V13.8947H14.0526C14.6921 13.8947 15.2105 14.4131 15.2105 15.0526V16.7895H4.78945V15.0526C4.78945 14.4131 5.30786 13.8947 5.94734 13.8947H8.84208V9.11672C6.84451 8.60253 5.3684 6.78966 5.3684 4.63158C5.3684 2.07363 7.44202 0 9.99997 0Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default JoyStickIcon;
