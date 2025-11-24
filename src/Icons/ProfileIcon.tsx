import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const ProfileIcon: React.FC<IconProps> = ({ className, size = 16, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 12 16'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M9.04753 3.16676C9.04753 4.84991 7.68306 6.21438 5.99991 6.21438C4.31675 6.21438 2.95229 4.84991 2.95229 3.16676C2.95229 1.48361 4.31675 0.119141 5.99991 0.119141C7.68306 0.119141 9.04753 1.48361 9.04753 3.16676Z'
          fill={color}
        />
        <path
          d='M12 12.8476C12 15.9588 9.31371 15.8809 6 15.8809C2.68629 15.8809 0 15.9588 0 12.8476C0 9.7365 2.68629 7.21443 6 7.21443C9.31371 7.21443 12 9.7365 12 12.8476Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ProfileIcon;
