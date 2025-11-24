import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SportButtonIcon: React.FC<IconProps & { active: boolean }> = ({ className, active }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      {active ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='75'
          height='38'
          viewBox='0 0 75 38'
          fill='none'
          className='h-full w-full'
          preserveAspectRatio='none'
        >
          <mask
            id='mask0_3366_10052'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='75'
            height='39'
          >
            <rect y='0.00012207' width='75' height='38' rx='6' fill='url(#paint0_linear_3366_10052)' />
          </mask>
          <g mask='url(#mask0_3366_10052)'>
            <rect y='0.00012207' width='75' height='38' rx='6' fill='url(#paint1_linear_3366_10052)' />
            <path
              d='M-4 33.9282L75.9792 -5.61321L77.4113 -2.83969L-1.13573 39.4753L-4 33.9282Z'
              fill='url(#paint2_linear_3366_10052)'
            />
            <path
              d='M-27 58.9282L82.5174 6.84924L86.163 13.9094L-19.7088 73.0486L-27 58.9282Z'
              fill='url(#paint3_linear_3366_10052)'
            />
            <path
              d='M-21.3459 20.3948L36.4244 -6.43834L38.868 -1.70597L-16.4588 29.8596L-21.3459 20.3948Z'
              fill='url(#paint4_linear_3366_10052)'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_3366_10052'
              x1='70.5'
              y1='0.000118734'
              x2='4'
              y2='37.0001'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#08E0FE' />
              <stop offset='1' stopColor='#6A00FF' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_3366_10052'
              x1='70.5'
              y1='0.000118734'
              x2='4'
              y2='37.0001'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#26E897' />
              <stop offset='1' stopColor='#454DE3' />
            </linearGradient>
            <linearGradient
              id='paint2_linear_3366_10052'
              x1='-2.56787'
              y1='36.7017'
              x2='76.6952'
              y2='-4.22645'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#08E0FE' stopOpacity='0' />
              <stop offset='1' stopColor='#454DE3' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_3366_10052'
              x1='35'
              y1='52.5'
              x2='70'
              y2='7'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.15' stopColor='#26E897' />
              <stop offset='1' stopColor='#454DE3' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_3366_10052'
              x1='2.83376'
              y1='14.1484'
              x2='36.2356'
              y2='-3.59712'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.36871' stopColor='#26E897' />
              <stop offset='1' stopColor='#454DE3' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width='75'
          height='38'
          viewBox='0 0 75 38'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='h-full w-full'
          preserveAspectRatio='none'
        >
          <mask
            id='mask0_3028_6331'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='75'
            height='38'
          >
            <rect width='75' height='38' rx='6' fill='url(#paint0_linear_3028_6331)' />
          </mask>
          <g mask='url(#mask0_3028_6331)'>
            <rect width='75' height='38' rx='6' fill='url(#paint1_linear_3028_6331)' />
            <path
              d='M-4 33.9282L75.9792 -5.61321L77.4113 -2.83969L-1.13573 39.4753L-4 33.9282Z'
              fill='url(#paint2_linear_3028_6331)'
            />
            <path
              d='M-27 58.9282L82.5174 6.84924L86.163 13.9094L-19.7088 73.0486L-27 58.9282Z'
              fill='url(#paint3_linear_3028_6331)'
            />
            <path
              d='M-21.3459 20.395L36.4244 -6.43816L38.868 -1.70579L-16.4588 29.8597L-21.3459 20.395Z'
              fill='url(#paint4_linear_3028_6331)'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_3028_6331'
              x1='70.5'
              y1='-3.33644e-06'
              x2='4'
              y2='37'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#08E0FE' />
              <stop offset='1' stopColor='#6A00FF' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_3028_6331'
              x1='80.5'
              y1='-1'
              x2='4'
              y2='37'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#3C537F' />
              <stop offset='1' stopColor='#22355A' />
            </linearGradient>
            <linearGradient
              id='paint2_linear_3028_6331'
              x1='-2.56787'
              y1='36.7017'
              x2='59.5'
              y2='0.866846'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#22355A' />
              <stop offset='1' stopColor='#182641' stopOpacity='0.2' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_3028_6331'
              x1='18'
              y1='45'
              x2='81.5'
              y2='11'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#22355A' />
              <stop offset='0.631289' stopColor='#182641' stopOpacity='0.3' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_3028_6331'
              x1='-3.50024'
              y1='17'
              x2='36.2562'
              y2='-3.55012'
              gradientUnits='userSpaceOnUse'
            >
              <stop offset='0.36871' stopColor='#182641' />
              <stop offset='1' stopColor='#22355A' />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default SportButtonIcon;
