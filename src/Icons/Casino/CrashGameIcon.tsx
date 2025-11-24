import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const CrashGameIcon: React.FC<IconProps> = ({ className, size = 24, color = '#E0FE08', opacity = 1 }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 26 26'
        fill='none'
        opacity={opacity}
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.837 0.247818C25.4168 -0.00665295 26.0071 0.583688 25.7526 1.16352L22.244 9.15804C22.1384 9.39868 22.2648 9.67781 22.5153 9.7573L24.4104 10.3586C24.8631 10.5023 25.0416 11.0477 24.7613 11.4311C24.7613 11.4311 19.7039 18.7481 17.9532 20.7447C16.2025 22.7413 13.2321 25.8135 9.60043 25.8135C4.40155 25.8135 0.187018 21.5989 0.187012 16.4C0.187012 12.7684 2.24027 9.72678 5.25569 8.04725C8.27112 6.36772 14.5693 1.23922 14.5693 1.23922C14.9528 0.958917 15.4982 1.13735 15.6419 1.59009L16.2432 3.48522C16.3227 3.73571 16.6018 3.86203 16.8424 3.75644L24.837 0.247818ZM9.60043 10.9036C6.56484 10.9036 4.10401 13.3644 4.104 16.4C4.104 19.4356 6.56484 21.8964 9.60043 21.8964C12.636 21.8964 15.0969 19.4356 15.0969 16.4C15.0969 13.3644 12.636 10.9036 9.60043 10.9036Z'
          fill={color}
        />
      </svg>
    </div>
  );
};

export default CrashGameIcon;
