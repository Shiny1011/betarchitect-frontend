import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const LayerIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 32 24'
        fill='none'
        opacity={opacity}
      >
        <path d='M28.8 15.5554V6.07388H6.4V0.147949H32V15.5554H28.8ZM0 23.8517V8.44425H25.6V23.8517H0Z' fill={color} />
      </svg>
    </div>
  );
};

export default LayerIcon;
