import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SettingIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 22 24'
        fill='none'
        opacity={opacity}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M8.61844 0.673294C10.0922 -0.177556 11.9078 -0.177556 13.3816 0.673294L19.6184 4.27432C21.092 5.12515 21.9999 6.69713 22 8.39864V15.6007C22 17.3024 21.0921 18.875 19.6184 19.7258L13.3816 23.3268C11.9079 24.1776 10.0921 24.1776 8.61844 23.3268L2.38156 19.7258C0.907869 18.875 2.76161e-05 17.3024 0 15.6007V8.39864C0.000104783 6.69713 0.908041 5.12515 2.38156 4.27432L8.61844 0.673294ZM11 8.0304C8.80786 8.0304 7.03078 9.80755 7.03073 11.9997C7.03073 14.1918 8.80783 15.9689 11 15.9689C13.1922 15.9689 14.9693 14.1918 14.9693 11.9997C14.9692 9.80755 13.1921 8.0304 11 8.0304Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SettingIcon;
