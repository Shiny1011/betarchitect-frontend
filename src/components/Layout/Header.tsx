'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { useLogout } from '@/components/features';
import { Button } from '@/components/shared';
import { useRouter } from '@/i18n/navigation';
import {
  BitcoinIcon,
  BonusIcon,
  CasinadeIcon,
  DownArrowIcon,
  EuroIcon,
  LogoutIcon,
  SearchIcon,
  SolIcon,
  UsdcIcon,
  UsdtIcon,
} from '@/Icons';
import { useIsMobile, useUserCache } from '@/lib/hooks';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isOpen: boolean;
  onSignupClick?: VoidFunction;
  onLoginClick?: VoidFunction;
  onDepositClick?: VoidFunction;
  onSearchClick?: VoidFunction;
  onLogoClick?: VoidFunction;
  wrapperEdges: { left: number; right: number };
  isResizing: boolean;
}

export const Header = (props: HeaderProps) => {
  const t = useTranslations();
  const { isOpen, onSignupClick, onLoginClick, onDepositClick, onSearchClick, wrapperEdges, isResizing, onLogoClick } =
    props;
  const { isAuthenticated } = useUserCache();
  const { mutateAsync: logout, isPending } = useLogout();

  const router = useRouter();
  const [walletOpen, setWalletOpen] = useState(false);
  const walletRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  const [isCurrencyCheck, setIsCurrencyCheck] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<{ code: string; Icon: React.FC }>({
    code: 'EUR',
    Icon: EuroIcon,
  });
  const currencies = [
    { code: 'EUR', Icon: EuroIcon },
    { code: 'SOL', Icon: SolIcon },
    { code: 'USDC', Icon: UsdcIcon },
    { code: 'USDT', Icon: UsdtIcon },
    { code: 'BTC1', Icon: BitcoinIcon },
    { code: 'BTC2', Icon: BitcoinIcon },
    { code: 'BTC3', Icon: BitcoinIcon },
    { code: 'BTC4', Icon: BitcoinIcon },
  ];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = walletRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setWalletOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const onLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <div
      className={`bg-dark-indigo fixed top-[17px] z-[101] flex h-[68px] rounded-xl px-[30px] max-md:px-[12px] ${isResizing || isMobile ? '' : 'transition-[left] duration-300'}`}
      style={{
        left: isMobile ? 20 : isOpen ? wrapperEdges.left + 281 : wrapperEdges?.left + 119,
        right: isMobile ? 20 : wrapperEdges.right + 24,
      }}
    >
      <div className='flex w-full max-w-[1440px] justify-between'>
        <div
          className='flex cursor-pointer items-center justify-center max-md:w-[70px]'
          onClick={() => {
            onLogoClick?.();
            router.push('/');
          }}
        >
          <CasinadeIcon />
        </div>
        <div className='flex items-center justify-center gap-[28px]'>
          <button type='button' className='max-md:hidden' aria-label='Open search' onClick={onSearchClick}>
            <SearchIcon />
          </button>
          {isAuthenticated ? (
            <div className='flex items-center justify-center gap-[12px] max-md:gap-0'>
              <div
                ref={walletRef}
                className='bg-blue-indigo relative flex h-[36px] w-[171px] items-center justify-between gap-3 rounded-lg border border-[#4C5D80] px-[10px] py-[10px] text-sm'
              >
                <div
                  className='flex cursor-pointer items-center justify-center gap-2'
                  onClick={() => setWalletOpen((v) => !v)}
                >
                  <selectedCurrency.Icon />
                  <span className='text-lemon-yellow leading-full text-sm font-medium'>150.50</span>
                  <button className='text-[#76C24D]' aria-label='Open wallet dropdown'>
                    <DownArrowIcon />
                  </button>
                </div>
                <button
                  onClick={() => router.push('/account')}
                  className='relative h-[28px] w-[28px] cursor-pointer rounded-full bg-[#5B6BA3]'
                  aria-label='Account'
                >
                  <span className='bg-lemon-yellow absolute right-0 bottom-0 h-2 w-2 rounded-full' />
                </button>

                <AnimatePresence>
                  {walletOpen && (
                    <>
                      {/* Mobile backdrop */}
                      {isMobile && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className='fixed inset-0 z-[-1] bg-black/20 backdrop-blur-sm'
                          onClick={() => setWalletOpen(false)}
                        />
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className={cn(
                          // Base styles
                          'absolute top-[calc(100%+8px)] right-0 w-[171px] origin-top-right',
                          'bg-blue-indigo rounded-[8px] border border-[#4C5D80] p-3 pr-[6px] shadow-xl',
                          // Mobile overrides
                          'max-md:bg-dark-indigo max-md:rounded-t-none max-md:rounded-b-[8px] max-md:border-0',
                          'max-md:right-auto max-md:left-[-13px] max-md:w-[calc(100vw-40px)] max-md:-translate-x-1/2'
                        )}
                      >
                        {/* Scrollable currency list */}
                        <div className='mt-[6px] max-h-[180px] space-y-[6px] overflow-y-auto pr-[6px]'>
                          {currencies.map((c) => (
                            <div
                              key={c.code}
                              className='flex w-full cursor-pointer flex-col items-start justify-between rounded-lg'
                              onClick={() => {
                                setSelectedCurrency(c);
                                setWalletOpen(false);
                              }}
                            >
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                  <c.Icon />
                                  <div
                                    className={`leading-full text-xs font-medium ${
                                      selectedCurrency.code === c.code ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
                                    }`}
                                  >
                                    {c.code}
                                  </div>
                                </div>
                                <div
                                  className={`leading-full text-xs ${
                                    selectedCurrency.code === c.code ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
                                  }`}
                                >
                                  0.0000087
                                </div>
                              </div>
                              <div className='mt-[1px] w-full justify-end text-right'>
                                <div
                                  className={`leading-full text-xs ${
                                    selectedCurrency.code === c.code ? 'text-lemon-yellow' : 'text-lemon-yellow/50'
                                  }`}
                                >
                                  €150.50
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bonus money */}
                        <div className='max-md:bg-blue-indigo mt-2 space-y-[2px] max-md:relative max-md:w-1/2 max-md:rounded-lg max-md:p-2'>
                          <div className='text-lemon-yellow text-xs font-medium'>Bonus money:</div>
                          <div className='text-lemon-yellow/50 text-xs'>€150.50</div>
                        </div>

                        {/* Toggle View in EUR */}
                        <div
                          className='mt-2 flex cursor-pointer items-center gap-[7px] rounded-lg max-md:mb-4'
                          onClick={() => {
                            setIsCurrencyCheck(!isCurrencyCheck);
                          }}
                        >
                          <Button
                            className='bg-dark-indigo relative h-3 w-[22px] rounded-full p-0'
                            aria-label='Toggle view in EUR'
                          >
                            <span
                              className={cn(
                                'bg-lavander absolute top-1/2 -left-[1px] h-3 w-3 translate-x-[2px] -translate-y-1/2 rounded-full transition-transform',
                                isCurrencyCheck && 'translate-x-[10px]'
                              )}
                            />
                          </Button>
                          <div className='text-lavander text-xs font-medium'>View in EUR</div>
                        </div>

                        {/* Mobile buttons */}
                        {isMobile && (
                          <div className='mt-2 space-y-2'>
                            <Button
                              onClick={onDepositClick}
                              variant='secondary_soft'
                              className='w-full rounded-full px-[16px] py-[8px] text-sm'
                            >
                              + Deposit
                            </Button>
                            <Button
                              variant='secondary'
                              className='text-lavander border-lavander flex w-full items-center justify-center gap-2.5 rounded-full border px-[16px] py-[8px] text-sm'
                            >
                              <BonusIcon /> Bonus
                            </Button>
                          </div>
                        )}

                        {/* Logout button */}
                        <Button
                          disabled={isPending}
                          onClick={onLogout}
                          variant='ghost'
                          className='bg-dark-indigo max-md:bg-blue-indigo mt-2 flex w-full items-center justify-center gap-1 rounded-xl px-6 py-3'
                        >
                          <LogoutIcon size={16} />
                          <span className='text-xs'>Log out</span>
                        </Button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <Button
                variant='secondary'
                className='text-lavander border-lavander flex gap-2.5 rounded-full border px-[16px] py-[8px] text-sm max-md:hidden'
              >
                <BonusIcon /> Bonus
              </Button>
              <Button
                onClick={onDepositClick}
                variant='secondary_soft'
                className='text-dark-indigo rounded-full px-[16px] py-[8px] text-sm max-md:hidden'
              >
                + Deposit
              </Button>
            </div>
          ) : (
            <>
              <div className='flex items-center justify-center gap-[12px]'>
                <Button
                  onClick={onLoginClick}
                  variant='secondary'
                  className='border-lemon-yellow text-lemon-yellow flex items-center justify-center rounded-sm border px-[22px] py-2'
                >
                  <span className='text-sm font-medium'>{t('auth.login.btn')}</span>
                </Button>
                <Button
                  onClick={onSignupClick}
                  variant='primary'
                  className='flex items-center justify-center rounded-sm px-[22px] py-2'
                >
                  <span className='text-sm font-medium'>{t('auth.signup.btn')}</span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
