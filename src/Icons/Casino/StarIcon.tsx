import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const StarIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 20 19'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M8.62995 1.07359C9.15849 -0.112144 10.8415 -0.112144 11.3701 1.07359L12.9629 4.64694C13.1809 5.13599 13.643 5.47175 14.1755 5.52795L18.0662 5.93859C19.3572 6.07485 19.8773 7.6755 18.9129 8.54458L16.0066 11.1637C15.6089 11.5221 15.4324 12.0654 15.5435 12.5892L16.3552 16.4163C16.6246 17.6863 15.263 18.6755 14.1384 18.0269L10.7494 16.0723C10.2856 15.8047 9.71438 15.8047 9.25057 16.0723L5.86158 18.0269C4.73703 18.6755 3.37543 17.6863 3.64479 16.4163L4.45653 12.5892C4.56763 12.0654 4.39111 11.5221 3.99336 11.1637L1.08711 8.54458C0.122739 7.6755 0.642822 6.07485 1.93385 5.93859L5.82451 5.52795C6.35699 5.47175 6.81913 5.13599 7.03712 4.64694L8.62995 1.07359Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default StarIcon;
