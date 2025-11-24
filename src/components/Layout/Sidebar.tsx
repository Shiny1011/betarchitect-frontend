'use client';

import { LocaleSwitcher } from '@/components/widgets';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  CasinoLobbyIcon,
  MenuIcon,
  SportLobbyIcon,
  CherryIcon,
  FireIcon,
  PlayIcon,
  SportIcon,
  HeadphoneIcon,
  SettingIcon,
  PresentIcon,
  ShareIcon,
  TranslateIcon,
  PromotionIcon,
  TournamentIcon,
  VIPIcon,
  CasinoButtonIcon,
  SportButtonIcon,
  XIcon,
  InstagramIcon,
  LinkedinIcon,
  EmailInboxIcon,
  Ball8Icon,
  CrashGameIcon,
  MegawaysIcon,
  JoyStickIcon,
  CardsIcon,
  CloverIcon,
  DiamondIcon,
  SpadesIcon,
  StarIcon,
  BaseballIcon,
  BasketballIcon,
  FootballIcon,
  IceHockeyIcon,
  TennisIcon,
  VolleyballIcon,
} from '@/Icons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isMobileNav?: boolean;
}

const Sidebar = ({ isOpen, setIsOpen, isMobileNav = false }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCasino = pathname === '/casino';
  const isSport = pathname === '/sport';

  const primaryItems = [
    { Icon: VIPIcon, label: 'VIP program', href: '/vip' },
    { Icon: PromotionIcon, label: 'Promotions', href: '/promotions' },
    { Icon: TournamentIcon, label: 'Tournaments' },
    { Icon: ShareIcon, label: 'Affiliate program' },
  ];

  const secondaryItems = [
    { Icon: SettingIcon, label: 'Setting', onClick: () => router.push('/account') },
    { Icon: HeadphoneIcon, label: 'Live Support', onClick: () => router.push('/') },
  ];

  const casinoItems = [
    { Icon: CardsIcon, label: 'Live casino ' },
    { Icon: SpadesIcon, label: 'Live dealer ' },
    { Icon: StarIcon, label: 'Popular games' },
    { Icon: FireIcon, label: 'New games' },
    { Icon: CloverIcon, label: 'Bonus Buys ' },
    { Icon: CherryIcon, label: 'Slots' },
    { Icon: CrashGameIcon, label: 'Crash games' },
    { Icon: MegawaysIcon, label: 'Megaways' },
    { Icon: Ball8Icon, label: 'Table games ' },
    { Icon: DiamondIcon, label: 'Jackpots' },
    { Icon: JoyStickIcon, label: 'Providers' },
  ];

  const sportFirstItems = [
    { Icon: CardsIcon, label: 'Live casino ' },
    { Icon: SpadesIcon, label: 'Live dealer ' },
    { Icon: StarIcon, label: 'Popular games' },
  ];

  const sportSecondItems = [
    { Icon: FootballIcon, label: 'Football' },
    { Icon: BasketballIcon, label: 'Basketball' },
    { Icon: VolleyballIcon, label: 'Volleyball' },
    { Icon: BaseballIcon, label: 'Baseball' },
    { Icon: TennisIcon, label: 'Tennis' },
    { Icon: JoyStickIcon, label: 'UFC' },
    { Icon: IceHockeyIcon, label: 'Ice Hockey' },
    { Icon: SportIcon, label: 'E-Sports' },
  ];

  if (!isOpen && isMobileNav) {
    return null;
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && !isMobileNav && (
        <div className='fixed inset-0 z-[90] bg-black/50 md:hidden' onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`bg-dark-indigo fixed mt-[17px] ml-2 flex h-fit flex-col items-center text-white max-md:top-50 ${
          isOpen ? 'pointer-events-none w-[241px] opacity-0' : 'w-[81px] opacity-100'
        } overflow-hidden rounded-[12px] py-3 transition-all duration-200 max-md:hidden`}
      >
        <div className='space-y-3'>
          <div onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon className='cursor-pointer px-2.5 py-4' opacity={0.5} />
          </div>
          <CasinoLobbyIcon className='cursor-pointer' />
          <SportLobbyIcon className='cursor-pointer' />
        </div>

        <div className={!isOpen ? 'animate-fade-in-up-sidebar' : ''} style={{ animationFillMode: 'backwards' }}>
          <div className='mt-[30px]'>
            <VIPIcon
              className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200'
              color='#334F84'
            />
          </div>

          <div className='mt-[24px] space-y-3'>
            <CherryIcon className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200' />
            <FireIcon className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200' />
            <PlayIcon className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200' />
            <SportIcon className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200' />
          </div>

          <div className='mt-[30px] space-y-3'>
            <PresentIcon className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200' />
            <ShareIcon
              className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200'
              color='#334F84'
            />
          </div>

          <div className='mt-[30px] space-y-3'>
            <HeadphoneIcon
              className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200'
              color='#334F84'
            />
            <TranslateIcon
              className='hover:bg-lavander/10 cursor-pointer p-[7px] transition-all duration-200'
              color='#334F84'
            />
          </div>
        </div>
      </div>

      <div
        className={`md:bg-dark-indigo text-lemon-yellow/50 flex flex-col items-start overflow-hidden rounded-[12px] transition-all duration-300 ${
          isMobileNav
            ? 'relative w-full py-[15px] opacity-100'
            : `fixed top-[17px] z-[100] ml-2 max-h-[calc(100dvh-34px)] px-[12px] py-[15px] max-md:hidden ${
                isOpen ? 'w-[241px] opacity-100' : 'pointer-events-none w-[81px] opacity-0'
              }`
        }`}
      >
        <div
          className={`${isMobileNav ? 'mb-[20px]' : 'mb-[15px]'} flex items-center ${isMobileNav ? 'ml-0 w-full gap-[6px]' : 'ml-2'}`}
        >
          <div onClick={() => setIsOpen(!isOpen)} className='max-md:hidden'>
            <MenuIcon className='cursor-pointer' opacity={0.5} />
          </div>
          <div
            className={`relative flex-1 cursor-pointer max-md:h-[42px] ${isMobileNav ? 'ml-0' : 'ml-4'}`}
            onClick={() => router.push('/casino')}
          >
            <div
              className='h-full w-full rounded-[5px]'
              style={{
                minHeight: '38px',
                minWidth: '75px',
                ...(isMobileNav && {
                  background: isCasino
                    ? 'linear-gradient(135deg, #E0FE08, #5d8312ff)'
                    : 'linear-gradient(135deg, #093998ff, #47494dff)',
                }),
              }}
            >
              <CasinoButtonIcon
                active={isCasino}
                className={
                  isMobileNav
                    ? 'block h-full w-full'
                    : 'h-full w-full [&_svg]:h-full [&_svg]:w-full [&>div]:h-full [&>div]:w-full'
                }
              />
            </div>
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium ${
                isCasino ? 'font-semibold text-[#152131]' : 'text-lavander/50'
              }`}
            >
              Casino
            </span>
          </div>
          <div
            className={`relative flex-1 cursor-pointer max-md:h-[42px] ${isMobileNav ? 'ml-0' : 'ml-[7px]'}`}
            onClick={() => router.push('/sport')}
          >
            <div
              className='h-full w-full rounded-[5px]'
              style={{
                minHeight: '38px',
                minWidth: '75px',
                ...(isMobileNav && {
                  background: isSport
                    ? 'linear-gradient(135deg, #E0FE08, #9ACD32)'
                    : 'linear-gradient(135deg, #202123ff, #9CA3AF)',
                }),
              }}
            >
              <SportButtonIcon
                active={isSport}
                className={
                  isMobileNav
                    ? 'block h-full w-full'
                    : 'h-full w-full [&_svg]:h-full [&_svg]:w-full [&>div]:h-full [&>div]:w-full'
                }
              />
            </div>
            <span
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] font-medium ${
                isSport ? 'font-semibold text-[#152131]' : 'text-lavander/50'
              }`}
            >
              Sport
            </span>
          </div>
        </div>

        <div
          className={`${isOpen ? 'animate-fade-in-up-sidebar' : ''} bg-dark-indigo hide-scrollbar h-fit min-h-0 w-full flex-1 overflow-y-auto rounded-[12px] max-md:px-[12px] max-md:py-[12px]`}
          style={{ animationFillMode: 'backwards' }}
        >
          {/** Casino items */}
          <div
            className={`overflow-hidden ${
              isCasino ? 'h-[565px] opacity-100' : 'pointer-events-none h-0 opacity-0'
            } transition-all duration-300`}
          >
            {casinoItems.map(({ Icon, label }) => (
              <div
                className='hover:bg-lemon-yellow/10 flex cursor-pointer items-center gap-3 rounded-lg transition-all duration-200'
                key={label}
              >
                <Icon size={24} className='p-3' opacity={0.5} color='#E0FE08' />
                <span
                  className={`text-lemon-yellow/50 text-[14px] transition-all duration-75 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  } whitespace-nowrap`}
                >
                  {label}
                </span>
              </div>
            ))}

            <div className='bg-lemon-yellow/50 mt-[24px] mb-[12px] h-[1px] w-full' />
          </div>

          {/** Sport items */}
          <div
            className={`overflow-hidden ${
              isSport ? 'h-[570px] opacity-100' : 'pointer-events-none h-0 opacity-0'
            } transition-all duration-300`}
          >
            {sportFirstItems.map(({ Icon, label }) => (
              <div
                className='hover:bg-lemon-yellow/10 flex cursor-pointer items-center gap-3 rounded-lg transition-all duration-200'
                key={label}
              >
                <Icon size={24} className='p-3' opacity={0.5} color='#E0FE08' />
                <span
                  className={`text-lemon-yellow/50 text-[14px] transition-all duration-75 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  } whitespace-nowrap`}
                >
                  {label}
                </span>
              </div>
            ))}

            <div className='bg-lemon-yellow/50 mt-[24px] mb-[12px] h-[1px] w-full' />

            {sportSecondItems.map(({ Icon, label }) => (
              <div
                className='hover:bg-lemon-yellow/10 flex cursor-pointer items-center gap-3 rounded-lg transition-all duration-200'
                key={label}
              >
                <Icon size={24} className='p-3' opacity={0.5} color='#E0FE08' />
                <span
                  className={`text-lemon-yellow/50 text-[14px] transition-all duration-75 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                  } whitespace-nowrap`}
                >
                  {label}
                </span>
              </div>
            ))}

            <div className='bg-lemon-yellow/50 my-[10px] h-[1px] w-full' />
          </div>

          {primaryItems.map(({ Icon, label, href }) => (
            <div
              className={`hover:bg-lemon-yellow/10 flex cursor-pointer ${
                pathname === href ? 'bg-lemon-yellow/10' : ''
              } items-center gap-3 rounded-lg transition-all duration-200`}
              key={label}
              onClick={() => href && router.push(href)}
            >
              <Icon size={24} className='p-3' opacity={0.5} />
              <span
                className={`text-lemon-yellow/50 text-[14px] transition-all duration-75 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                } whitespace-nowrap`}
              >
                {label}
              </span>
            </div>
          ))}

          <div className='bg-lemon-yellow/50 mt-[24px] mb-[12px] h-[1px] w-full' />

          {secondaryItems.map(({ Icon, label, onClick }) => (
            <div
              className='hover:bg-lemon-yellow/10 flex cursor-pointer items-center gap-3 rounded-lg transition-all duration-200'
              key={label}
              onClick={onClick}
            >
              <Icon size={24} className='p-3' opacity={0.5} />
              <span
                className={`text-lemon-yellow/50 text-[14px] transition-all duration-75 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                } whitespace-nowrap`}
              >
                {label}
              </span>
            </div>
          ))}
          <LocaleSwitcher />
          <div className='mt-3 flex justify-center space-x-4 max-md:hidden'>
            <a
              href='#'
              className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
              aria-label='X'
            >
              <XIcon size={16} color='#768915' />
            </a>
            <a
              href='#'
              className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
              aria-label='Instagram'
            >
              <InstagramIcon color='#768915' />
            </a>
            <a
              href='#'
              className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
              aria-label='Linkedin'
            >
              <LinkedinIcon color='#768915' />
            </a>
            <a
              href='#'
              className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
              aria-label='Email'
            >
              <EmailInboxIcon size={20} color='#768915' />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
