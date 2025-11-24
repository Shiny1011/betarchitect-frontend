import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const MegawaysIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 28 22'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M26.2608 0.0116425C26.8889 -0.0870178 27.4311 0.456055 27.3322 1.08416L25.8325 10.5839C25.7131 11.3404 24.7858 11.6421 24.2442 11.1009L22.5998 9.45655L17.6574 14.399V21.1679C17.6571 21.6276 17.2839 21.9998 16.8241 22H10.9924C10.5325 21.9999 10.1594 21.6277 10.1591 21.1679V14.2169L5.3987 9.45655L3.7555 11.1009C3.21405 11.6424 2.28703 11.3412 2.16715 10.5851L0.667492 1.08416C0.568515 0.455917 1.11061 -0.0860965 1.73884 0.0128095L11.2398 1.51246C11.996 1.63227 12.2971 2.55934 11.7556 3.10082L10.1112 4.74402L13.9987 8.63145L17.8873 4.74402L16.2441 3.10082C15.7026 2.55931 16.0036 1.63219 16.7599 1.51246L26.2608 0.0116425Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default MegawaysIcon;
