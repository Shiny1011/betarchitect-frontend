import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const CasinoButtonIcon: React.FC<IconProps & { active?: boolean }> = ({ className, active }): ReactElement => {
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
            id='mask0_3339_5440'
            style={{ mask: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='75'
            height='38'
          >
            <rect width='75' height='38' rx='6' fill='url(#paint0_linear_3339_5440)' />
          </mask>
          <g mask='url(#mask0_3339_5440)'>
            <rect width='75' height='38' rx='6' fill='url(#paint1_linear_3339_5440)' />
            <ellipse
              cx='69.3176'
              cy='12.425'
              rx='16.5676'
              ry='17.002'
              transform='rotate(-34.9268 69.3176 12.425)'
              fill='url(#paint2_linear_3339_5440)'
            />
            <circle
              cx='10.3907'
              cy='23.3914'
              r='18.285'
              transform='rotate(165 10.3907 23.3914)'
              fill='url(#paint3_linear_3339_5440)'
            />
            <ellipse
              cx='63.0818'
              cy='30.4736'
              rx='16.5676'
              ry='17.002'
              transform='rotate(-174.646 63.0818 30.4736)'
              fill='url(#paint4_linear_3339_5440)'
            />
            <ellipse
              cx='25.2536'
              cy='14.1742'
              rx='15.0262'
              ry='14.8315'
              transform='rotate(-151.776 25.2536 14.1742)'
              fill='url(#paint5_linear_3339_5440)'
            />
            <g style={{ mixBlendMode: 'plus-lighter' }}>
              <circle
                cx='56.516'
                cy='7.516'
                r='11.9651'
                transform='rotate(111.483 56.516 7.516)'
                fill='url(#paint6_linear_3339_5440)'
              />
            </g>
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_3339_5440'
              x1='70.5'
              y1='-3.33644e-06'
              x2='4'
              y2='37'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#E0FE08' />
              <stop offset='1' stopColor='#00FF6A' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_3339_5440'
              x1='70.5'
              y1='-3.33644e-06'
              x2='4'
              y2='37'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#E0FE08' />
              <stop offset='1' stopColor='#00FF6A' />
            </linearGradient>
            <linearGradient
              id='paint2_linear_3339_5440'
              x1='50.6791'
              y1='-6.70229'
              x2='86.6803'
              y2='24.2518'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#00FF6A' />
              <stop offset='1' stopColor='#E0FE08' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_3339_5440'
              x1='6.52946'
              y1='14.9589'
              x2='29.4896'
              y2='37.919'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#E0FE08' />
              <stop offset='1' stopColor='#00FF6A' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_3339_5440'
              x1='44.4433'
              y1='11.3463'
              x2='80.4445'
              y2='42.3004'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#00FF6A' />
              <stop offset='1' stopColor='#E0FE08' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint5_linear_3339_5440'
              x1='8.34918'
              y1='-2.51124'
              x2='39.9148'
              y2='25.7063'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#00FF6A' />
              <stop offset='1' stopColor='#E0FE08' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint6_linear_3339_5440'
              x1='45.741'
              y1='0.806274'
              x2='67.7213'
              y2='7.97882'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#E0FE08' />
              <stop offset='1' stopColor='#00FF6A' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg width='75' height='38' viewBox='0 0 75 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <mask
            id='mask0_3028_6321'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='75'
            height='38'
          >
            <rect width='75' height='38' rx='6' fill='url(#paint0_linear_3028_6321)' />
          </mask>
          <g mask='url(#mask0_3028_6321)'>
            <rect width='75' height='38' rx='6' fill='url(#paint1_linear_3028_6321)' />
            <ellipse
              cx='69.3176'
              cy='12.425'
              rx='16.5676'
              ry='17.002'
              transform='rotate(-34.9268 69.3176 12.425)'
              fill='url(#paint2_linear_3028_6321)'
            />
            <ellipse
              cx='63.0818'
              cy='30.4736'
              rx='16.5676'
              ry='17.002'
              transform='rotate(-174.646 63.0818 30.4736)'
              fill='url(#paint3_linear_3028_6321)'
            />
            <circle
              cx='10.3925'
              cy='23.3924'
              r='18.2835'
              transform='rotate(165 10.3925 23.3924)'
              fill='url(#paint4_linear_3028_6321)'
            />
            <ellipse
              cx='25.2539'
              cy='14.1742'
              rx='15.0262'
              ry='14.8315'
              transform='rotate(-151.776 25.2539 14.1742)'
              fill='url(#paint5_linear_3028_6321)'
            />
            <circle
              cx='56.5157'
              cy='7.516'
              r='11.9651'
              transform='rotate(111.483 56.5157 7.516)'
              fill='url(#paint6_linear_3028_6321)'
            />
          </g>
          <defs>
            <linearGradient
              id='paint0_linear_3028_6321'
              x1='70.5'
              y1='-3.33644e-06'
              x2='4'
              y2='37'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#E0FE08' />
              <stop offset='1' stopColor='#00FF6A' />
            </linearGradient>
            <linearGradient
              id='paint1_linear_3028_6321'
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
              id='paint2_linear_3028_6321'
              x1='50.6791'
              y1='-6.70229'
              x2='86.6803'
              y2='24.2518'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#182641' stopOpacity='0.1' />
              <stop offset='1' stopColor='#22355A' stopOpacity='0.2' />
            </linearGradient>
            <linearGradient
              id='paint3_linear_3028_6321'
              x1='44.4433'
              y1='11.3463'
              x2='80.4445'
              y2='42.3004'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#182641' />
              <stop offset='1' stopColor='#22355A' stopOpacity='0.5' />
            </linearGradient>
            <linearGradient
              id='paint4_linear_3028_6321'
              x1='4.3848'
              y1='0.965743'
              x2='29.4898'
              y2='37.9188'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#182641' stopOpacity='0.2' />
              <stop offset='1' stopColor='#22355A' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint5_linear_3028_6321'
              x1='8.34942'
              y1='-2.51124'
              x2='39.915'
              y2='25.7063'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#182641' stopOpacity='0.5' />
              <stop offset='1' stopColor='#22355A' stopOpacity='0' />
            </linearGradient>
            <linearGradient
              id='paint6_linear_3028_6321'
              x1='45.7407'
              y1='0.806274'
              x2='67.7211'
              y2='7.97882'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#182641' />
              <stop offset='1' stopColor='#22355A' stopOpacity='0' />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
};

export default CasinoButtonIcon;
