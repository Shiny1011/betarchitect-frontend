'use client';

import { useState, useCallback } from 'react';

import { useSwipeable } from 'react-swipeable';

import Sidebar from '@/components/Layout/Sidebar';
import { Results, ProviderFilter, CategoryFilter, GameSearch } from '@/components/shared';
import { GAME_ITEMS } from '@/constants';
import { useGameSearch } from '@/lib/hooks';

interface NavigationMobileProps {
  isOpen: boolean;
  setNavigationIsOpen: (isOpen: boolean) => void;
}

export function NavigationMobile({ isOpen, setNavigationIsOpen }: NavigationMobileProps) {
  const [searchValue, setSearchValue] = useState('');
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const filtered = useGameSearch(GAME_ITEMS, searchValue);

  const handleFocus = useCallback(() => {
    setSidebarIsOpen(false);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setSidebarIsOpen(true),
    trackMouse: true,
    trackTouch: true,
    preventScrollOnSwipe: true,
    delta: 10,
  });

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div className='fixed inset-0 z-[90] bg-black/50 md:hidden' onClick={() => setNavigationIsOpen(false)} />
      )}

      {/* Navigation content */}
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 z-[100] rounded-[12px] p-3 px-[20px] pt-25 pb-12 transition-all duration-300 md:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        } hide-scrollbar overflow-y-auto bg-[#182641]`}
        {...swipeHandlers}
      >
        {/* Search */}
        <div className='mb-0'>
          <GameSearch value={searchValue} onChange={setSearchValue} onFocus={handleFocus} />
          {!sidebarIsOpen && (
            <>
              <CategoryFilter />
              <ProviderFilter />
              <Results games={filtered} />
            </>
          )}
        </div>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarIsOpen} setIsOpen={setNavigationIsOpen} isMobileNav={true} />
      </div>
    </>
  );
}
