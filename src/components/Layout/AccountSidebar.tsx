'use client';

import { useMemo } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { useLogout } from '@/components/features';
import { BonusIcon, ProfileIcon, WalletIcon, SecurityIcon, HistoryIcon, WarningIcon, LogoutIcon } from '@/Icons';

export default function AccountSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations('page.account.sidebar');
  const { mutateAsync: logout, isPending } = useLogout();

  const sidebarItems = useMemo(
    () => [
      { id: 'profile', label: t('profile'), Icon: ProfileIcon, path: '/account' },
      { id: 'bonus', label: t('bonus'), Icon: BonusIcon, path: '/account/bonus' },
      { id: 'wallet', label: t('wallet'), Icon: WalletIcon, path: '/account/wallet' },
      { id: 'security', label: t('security'), Icon: SecurityIcon, path: '/account/security' },
      { id: 'history', label: t('history'), Icon: HistoryIcon, path: '/account/history' },
      { id: 'limits', label: t('limits'), Icon: WarningIcon, path: '/account/limits' },
      { id: 'exclusion', label: t('exclusion'), Icon: ProfileIcon, path: '/account/exclusion' },
    ],
    [t]
  );

  const localePrefix = '/' + pathname.split('/').filter(Boolean)[0];

  return (
    <div className='bg-dark-primary bg-dark-indigo sticky top-[105px] h-[calc(100vh-135px)] w-full max-w-[209px] min-w-[208px] flex-1 rounded-2xl px-0 py-6'>
      {/* User Info */}
      <div className='mx-auto hidden h-[76px] w-[178px] rounded-lg bg-[#22355A] md:block'>
        <div className='flex h-full items-center justify-center space-x-3'>
          <div className='relative'>
            <div className='flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#D9D9D9]'></div>
            <div className='bg-lavander absolute right-0 bottom-0 h-[17px] w-[17px] rounded-full'></div>
          </div>
          <div>
            <h3 className='text-lemon-yellow text-sm font-bold'>George Fox</h3>
            <p className='text-lemon-yellow/50 text-xs'>gfox0907</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='mt-2 md:mt-8'>
        {sidebarItems.map(({ id, Icon, label, path }) => {
          const localizedPath = `${localePrefix}${path}`;
          const isActive = id === 'profile' ? pathname === localizedPath : pathname.startsWith(localizedPath);

          return (
            <button
              key={id}
              onClick={() => router.push(localizedPath)}
              disabled={isPending && id === 'logout'}
              className={`relative flex h-auto w-full items-center justify-start space-x-3 rounded-lg py-[13.5px] pl-[22px] transition-colors md:h-[52px] ${
                isActive ? 'text-lemon-yellow' : 'text-lemon-yellow hover:text-lemon-yellow/80'
              } cursor-pointer`}
            >
              {isActive && (
                <div className='bg-lemon-yellow absolute top-auto bottom-auto left-0 h-9 w-1 rounded-r'></div>
              )}
              <Icon className='h-[25px] w-[25px]' color={isActive ? '#E0FE08' : '#768915'} size={20} />
              <span
                className={`text-base font-medium whitespace-nowrap ${
                  isActive ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
        <button
          key='logout'
          onClick={async () => {
            await logout();
          }}
          disabled={isPending}
          className={`text-lemon-yellow hover:text-lemon-yellow/80 relative flex h-auto w-full cursor-pointer items-center justify-start space-x-3 rounded-lg py-[13.5px] pl-[22px] transition-colors md:h-[52px] ${isPending ? 'disabled:cursor-not-allowed disabled:opacity-50' : ''}`}
        >
          <LogoutIcon className='h-[25px] w-[25px]' color={'#768915'} size={20} />
          <span className='text-lemon-yellow/50 text-base font-medium whitespace-nowrap'>{t('logout')}</span>
        </button>
      </nav>
    </div>
  );
}
