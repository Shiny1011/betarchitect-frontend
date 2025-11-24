import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const AppleIcon: React.FC<IconProps> = ({ className, size = 22, opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 18 22'
        fill='none'
        opacity={opacity}
      >
        <path
          d='M14.9974 20.8253C13.8343 21.9528 12.5645 21.7748 11.3421 21.2407C10.0485 20.6948 8.86174 20.6711 7.49695 21.2407C5.788 21.9765 4.88605 21.7629 3.86542 20.8253C-1.92604 14.8559 -1.07157 5.76517 5.50317 5.43287C7.10532 5.51595 8.22089 6.31109 9.15844 6.38229C10.5588 6.09747 11.8999 5.27859 13.3952 5.3854C15.1873 5.52781 16.5402 6.23988 17.4303 7.5216C13.7275 9.74087 14.6057 14.6185 17.9999 15.9833C17.3235 17.7635 16.4452 19.5318 14.9855 20.8372L14.9974 20.8253ZM9.03976 5.36167C8.86174 2.71516 11.0098 0.531491 13.4783 0.317871C13.8225 3.37975 10.7012 5.65836 9.03976 5.36167Z'
          fill='#182641'
        />
      </svg>
    </div>
  );
};

export default AppleIcon;
