'use client';

import React, { useState } from 'react';

import { Button } from '@/components/shared';
import { useRouter } from '@/i18n/navigation';
import { HeadphoneIcon, MenuIcon, ProfileIcon, SportMobileIcon } from '@/Icons';
import CasinoMobileIcon from '@/Icons/CasinoMobileIcon';
import { useUserCache } from '@/lib/hooks';
import { IconProps } from '@/lib/schema';

interface NavItem {
  id: string;
  icon: React.FC<IconProps>;
  label: string;
  onClick: () => void;
  needsActive: boolean;
  isSpecial?: boolean;
}

interface MobileBottomNavProps {
  onSignupClick?: VoidFunction;
  onNavigationClick?: VoidFunction;
}

export function MobileBottomNav({ onSignupClick, onNavigationClick }: MobileBottomNavProps) {
  const router = useRouter();
  const { isAuthenticated } = useUserCache();
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const renderIcon = (
    IconComponent: React.FC<IconProps>,
    needsActive: boolean,
    isSpecial: boolean,
    isActive: boolean
  ) => {
    if (isSpecial) {
      return <IconComponent size={24} color='#E0FE08' opacity={0.5} />;
    }
    if (needsActive) {
      return <IconComponent active={false} />;
    }
    return <IconComponent size={24} color='#E0FE08' opacity={isActive ? 1 : 0.5} />;
  };

  const navItems: NavItem[] = [
    {
      id: 'navigation',
      icon: MenuIcon,
      label: 'Navigation',
      onClick: () => {
        setActiveItem('navigation');
        onNavigationClick?.();
      },
      needsActive: false,
    },
    {
      id: 'casino',
      icon: CasinoMobileIcon,
      label: 'Casino',
      onClick: () => router.push('/casino'),
      needsActive: true,
    },
    ...(isAuthenticated
      ? []
      : [
          {
            id: 'signup',
            icon: ProfileIcon,
            label: 'Sign Up',
            onClick: onSignupClick || (() => {}),
            isSpecial: true,
            needsActive: false,
          },
        ]),
    {
      id: 'sport',
      icon: SportMobileIcon,
      label: 'Sport',
      onClick: () => router.push('/sport'),
      needsActive: true,
    },
    ...(isAuthenticated
      ? [
          {
            id: 'profile',
            icon: ProfileIcon,
            label: 'Profile',
            onClick: () => router.push('/account'),
            needsActive: false,
          },
        ]
      : []),
    {
      id: 'support',
      icon: HeadphoneIcon,
      label: 'Support',
      onClick: () => {
        // Handle support
      },
      needsActive: false,
    },
  ];

  return (
    <div className='fixed right-[20px] bottom-0 left-[20px] z-[100] flex h-[63px] items-end justify-between rounded-t-[12px] border-t border-[#1a2942] bg-[#0A1628] p-3 md:hidden'>
      {navItems.map(({ id, onClick, label, icon, needsActive, isSpecial }) => {
        const isActive = activeItem === id;
        return (
          <Button
            key={id}
            onClick={onClick}
            variant='ghost'
            className='flex flex-col items-center justify-end gap-1 p-0'
            aria-label={label}
          >
            <div
              className={`flex items-center justify-center ${isSpecial ? 'border-lemon-yellow h-[40px] w-[40px] rounded-full border-2 bg-[#0A1628]' : 'h-6 w-6'}`}
            >
              {renderIcon(icon, needsActive, isSpecial || false, isActive)}
            </div>
            <span className={`text-[10px] font-medium ${isActive ? 'text-lemon-yellow' : 'text-lemon-yellow/50'}`}>
              {label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
