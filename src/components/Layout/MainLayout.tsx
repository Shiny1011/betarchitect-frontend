'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import {
  AccountSuccessModal,
  ForgotPasswordModal,
  ForgotPasswordSuccessModal,
  LoginModal,
  SignUpDetailsModal,
  SignupModal,
} from '@/components/Auth';
import DepositModal from '@/components/Finance/DepositModal';
import DepositSuccessModal from '@/components/Finance/DepositSuccessModal';
import Footer from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';
import { MobileBottomNav } from '@/components/Layout/MobileBottomNav';
import { NavigationMobile } from '@/components/Layout/NavigationMobile';
import Sidebar from '@/components/Layout/Sidebar';
import SearchModal from '@/components/SearchModal';

interface MainLayoutProps {
  children: React.ReactNode;
}

// TODO: Refactor layout to clean up the code, removing all the modals from here

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNavigationMobileOpen, setIsNavigationMobileOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isForgotSuccessOpen, setIsForgotSuccessOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isDepositSuccessOpen, setIsDepositSuccessOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperEdges, setWrapperEdges] = useState<{ left: number; right: number }>({ left: 0, right: 0 });
  const [isResizing, setIsResizing] = useState(false);

  const update = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const left = rect.left + window.scrollX + (pathname.includes('account') ? 24 : 0);
    const rightDistance = window.innerWidth - rect.right + (pathname.includes('account') ? 24 : 2);
    setWrapperEdges({ left, right: rightDistance });
  }, [pathname]);

  useEffect(() => {
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  useEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    let timer: number | undefined;
    const onResize = () => {
      setIsResizing(true);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setIsResizing(false), 300);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const excludeFooterPaths = ['/account'];

  return (
    <div className='1440:justify-center flex w-full justify-start gap-[76px]'>
      <div ref={wrapperRef} className='w-full max-w-[1440px]'>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className={`mt-[17px] w-full ${pathname.includes('account') ? 'pr-[54px]' : 'pr-[32px]'} max-md:pr-0`}>
          <Header
            isOpen={isSidebarOpen}
            onSignupClick={() => setIsSignupOpen(true)}
            onLoginClick={() => setIsLoginOpen(true)}
            onDepositClick={() => setIsDepositOpen(true)}
            onSearchClick={() => setIsSearchOpen(true)}
            onLogoClick={() => setIsNavigationMobileOpen(false)}
            wrapperEdges={wrapperEdges}
            isResizing={isResizing}
          />
          <div
            className={`bg-blue-indigo fixed top-[0px] z-[80] flex h-[66px] px-[30px] md:h-[105px] ${isResizing ? '' : 'transition-[left] duration-300'}`}
            style={{
              left: isSidebarOpen ? wrapperEdges.left + 281 : wrapperEdges?.left + 119,
              right: wrapperEdges.right + 24,
            }}
          ></div>

          <div
            className={`mt-[105px] ${
              isSidebarOpen
                ? pathname.includes('account')
                  ? 'ml-[305px]'
                  : 'ml-[281px]'
                : pathname.includes('account')
                  ? 'ml-[143px]'
                  : 'ml-[119px]'
            } transition-all duration-300 max-md:left-0 max-md:mr-[20px] max-md:ml-[20px]`}
          >
            {children}
            {!excludeFooterPaths.includes(pathname) && <Footer />}
          </div>
          <SignupModal
            open={isSignupOpen}
            onClose={() => setIsSignupOpen(false)}
            onSuccess={() => setIsProfileOpen(true)}
            onLogin={() => {
              setIsSignupOpen(false);
              setIsLoginOpen(true);
            }}
          />
          <SignUpDetailsModal
            open={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            onSuccess={() => {
              setIsProfileOpen(false);
              setIsSuccessOpen(true);
            }}
          />
          <AccountSuccessModal open={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} />
          <LoginModal
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onForgot={() => {
              setIsLoginOpen(false);
              setIsForgotOpen(true);
            }}
            onSignup={() => {
              setIsLoginOpen(false);
              setIsSignupOpen(true);
            }}
          />
          <ForgotPasswordModal
            open={isForgotOpen}
            onClose={() => setIsForgotOpen(false)}
            onSuccess={() => {
              setIsForgotOpen(false);
              setIsForgotSuccessOpen(true);
            }}
          />
          <ForgotPasswordSuccessModal open={isForgotSuccessOpen} onClose={() => setIsForgotSuccessOpen(false)} />

          <DepositModal
            open={isDepositOpen}
            onClose={() => setIsDepositOpen(false)}
            onSuccess={() => {
              setIsDepositOpen(false);
              setIsDepositSuccessOpen(true);
            }}
          />
          <DepositSuccessModal open={isDepositSuccessOpen} onClose={() => setIsDepositSuccessOpen(false)} />

          <SearchModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </div>
      <NavigationMobile isOpen={isNavigationMobileOpen} setNavigationIsOpen={setIsNavigationMobileOpen} />
      <MobileBottomNav
        onSignupClick={() => setIsSignupOpen(true)}
        onNavigationClick={() => setIsNavigationMobileOpen(true)}
      />
    </div>
  );
}
