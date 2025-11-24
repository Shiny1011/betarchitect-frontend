import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const EmailInboxIcon: React.FC<IconProps> = ({ className, size = 18, color = '#97B9FF' }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 20 16' fill='none'>
        <path
          d='M2.47948 15.2997C1.96245 15.2997 1.51999 15.1158 1.15212 14.7479C0.784243 14.3801 0.599992 13.9373 0.599365 13.4196V2.13896C0.599365 1.62193 0.783616 1.17948 1.15212 0.811603C1.52062 0.443728 1.96307 0.259477 2.47948 0.25885H17.5204C18.0374 0.25885 18.4802 0.443101 18.8487 0.811603C19.2172 1.1801 19.4011 1.62256 19.4005 2.13896V13.4196C19.4005 13.9367 19.2165 14.3794 18.8487 14.7479C18.4808 15.1164 18.038 15.3004 17.5204 15.2997H2.47948ZM9.99992 8.71935L17.5204 4.01907V2.13896L9.99992 6.83924L2.47948 2.13896V4.01907L9.99992 8.71935Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default EmailInboxIcon;
