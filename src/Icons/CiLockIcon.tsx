import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const CiLockIcon: React.FC<IconProps> = ({ className, size = 19, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 14 19'
        fill='none'
        opacity={opacity}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M7 0.875C9.8995 0.875 12.25 3.22551 12.25 6.125V7.75537C13.1235 8.06446 13.75 8.89561 13.75 9.875V15.875C13.75 17.1176 12.7426 18.125 11.5 18.125H2.5C1.25736 18.125 0.25 17.1176 0.25 15.875V9.875C0.25 8.89561 0.876491 8.06446 1.75 7.75537V6.125C1.75 3.22551 4.10051 0.875 7 0.875ZM7 10.625C6.17157 10.625 5.5 11.2966 5.5 12.125C5.5 12.6798 5.80218 13.1626 6.25 13.4221V14.375C6.25 14.7892 6.58579 15.125 7 15.125C7.41421 15.125 7.75 14.7892 7.75 14.375V13.4221C8.19782 13.1626 8.5 12.6798 8.5 12.125C8.5 11.2966 7.82843 10.625 7 10.625ZM7 2.375C4.92893 2.375 3.25 4.05393 3.25 6.125V7.625H10.75V6.125C10.75 4.05393 9.07107 2.375 7 2.375Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CiLockIcon;
