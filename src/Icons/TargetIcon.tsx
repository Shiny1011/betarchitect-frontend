import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const TargetIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 34 24'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M3.2381 15.2379H0V23.3332H8.09524V20.0951H3.2381V15.2379ZM0 8.76174H3.2381V3.9046H8.09524V0.666504H0V8.76174ZM30.7619 20.0951H25.9048V23.3332H34V15.2379H30.7619V20.0951ZM25.9048 0.666504V3.9046H30.7619V8.76174H34V0.666504H25.9048Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default TargetIcon;
