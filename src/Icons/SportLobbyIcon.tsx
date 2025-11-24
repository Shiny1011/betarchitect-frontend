import type { ReactElement } from 'react';

import { IconProps } from '@/lib/schema';

const SportLobbyIcon: React.FC<IconProps> = ({ className }): ReactElement => {
  return (
    <div className={`flex items-center justify-center rounded-[5px] ${className}`}>
      <svg width='41' height='40' viewBox='0 0 41 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <mask
          id='mask0_2515_9488'
          style={{ maskType: 'alpha' }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='41'
          height='40'
        >
          <rect x='0.5' width='40' height='40' rx='6.66667' fill='url(#paint0_linear_2515_9488)' />
        </mask>
        <g mask='url(#mask0_2515_9488)'>
          <rect x='0.5' width='40' height='40' rx='6.66667' fill='url(#paint1_linear_2515_9488)' />
          <path
            d='M-2.83325 28.2734L63.8161 -4.67776L65.0095 -2.36649L-0.446363 32.896L-2.83325 28.2734Z'
            fill='url(#paint2_linear_2515_9488)'
          />
          <path
            d='M-22 49.1069L69.2645 5.70778L72.3025 11.5913L-15.924 60.8739L-22 49.1069Z'
            fill='url(#paint3_linear_2515_9488)'
          />
          <path
            d='M-17.2883 16.9961L30.8537 -5.36489L32.89 -1.42125L-13.2157 24.8834L-17.2883 16.9961Z'
            fill='url(#paint4_linear_2515_9488)'
          />
        </g>
        <path
          d='M26.3923 14.1075C25.6208 13.3302 24.7029 12.7136 23.6916 12.2934C22.6803 11.8731 21.5958 11.6576 20.5006 11.6592C19.4052 11.6573 18.3203 11.8728 17.3087 12.293C16.2971 12.7133 15.3789 13.33 14.6073 14.1075C11.3581 17.3559 11.3581 22.6434 14.6073 25.8925C15.379 26.6701 16.2973 27.2869 17.3091 27.7072C18.3208 28.1274 19.4059 28.3428 20.5015 28.3409C21.5965 28.3426 22.6811 28.1272 23.6924 27.7071C24.7037 27.287 25.6216 26.6705 26.3931 25.8934C29.6423 22.645 29.6423 17.3575 26.3923 14.1075ZM25.7023 24.1667H23.8331L22.7848 26.2634C22.0533 26.5328 21.2802 26.6718 20.5006 26.6742C19.7196 26.6721 18.9451 26.5327 18.2123 26.2625L17.1665 24.175H15.304C14.6168 23.3208 14.1521 22.3095 13.9515 21.2317L15.4998 19.1667L14.4865 17.1392C14.8107 16.4519 15.2501 15.8251 15.7856 15.2859C16.5364 14.5327 17.4564 13.9701 18.469 13.645L20.4998 15L22.5315 13.6459C23.5439 13.9707 24.4639 14.533 25.2148 15.2859C25.7498 15.8244 26.1889 16.4503 26.5131 17.1367L25.4998 19.1667L27.0481 21.2317C26.8484 22.306 26.3861 23.3143 25.7023 24.1667Z'
          fill='#0C1423'
        />
        <path
          d='M17.583 19.1665L18.833 22.4998H22.1663L23.4163 19.1665L20.4997 17.0832L17.583 19.1665Z'
          fill='#0C1423'
        />
        <defs>
          <linearGradient
            id='paint0_linear_2515_9488'
            x1='41.75'
            y1='-1.66667'
            x2='0.5'
            y2='37.9167'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#E0FE08' />
            <stop offset='1' stopColor='#26E897' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_2515_9488'
            x1='43.4333'
            y1='-1.05264'
            x2='-4.4037'
            y2='10.9869'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3C537F' />
            <stop offset='1' stopColor='#22355A' />
          </linearGradient>
          <linearGradient
            id='paint2_linear_2515_9488'
            x1='-1.63981'
            y1='30.5847'
            x2='50.0834'
            y2='0.722291'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#22355A' />
            <stop offset='1' stopColor='#182641' stopOpacity='0.2' />
          </linearGradient>
          <linearGradient
            id='paint3_linear_2515_9488'
            x1='15.5'
            y1='37.5001'
            x2='68.4167'
            y2='9.16675'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#22355A' />
            <stop offset='0.631289' stopColor='#182641' stopOpacity='0.3' />
          </linearGradient>
          <linearGradient
            id='paint4_linear_2515_9488'
            x1='-2.41691'
            y1='14.1669'
            x2='30.7135'
            y2='-2.95819'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='0.36871' stopColor='#182641' />
            <stop offset='1' stopColor='#22355A' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SportLobbyIcon;
