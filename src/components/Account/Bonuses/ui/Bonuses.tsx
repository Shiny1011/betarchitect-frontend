'use client';

import { useState } from 'react';

import { ActiveBonuses } from './ActiveBonuses';
import { AvailableBonuses } from './AvailableBonuses';
import { Cashback } from './Cashback';
import { History } from './History';
import { Rakeback } from './Rakeback';

type BonusesTab = 'active' | 'available' | 'cashback' | 'rakeback' | 'history';

interface IBonusesTab {
  id: BonusesTab;
  label: string;
}

const tabs: IBonusesTab[] = [
  { id: 'active', label: 'Active' },
  { id: 'available', label: 'Available' },
  { id: 'cashback', label: 'Cashback' },
  { id: 'rakeback', label: 'Rakeback' },
  { id: 'history', label: 'History' },
] as const;

export function Bonuses() {
  const [activeTab, setActiveTab] = useState<BonusesTab>('active');

  return (
    <div className='w-full'>
      {/* Tabs */}
      <div className='bg-dark-indigo flex w-full flex-wrap gap-1 rounded-2xl p-3 md:w-fit'>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`h-[35px] w-[100px] rounded-xl text-xs font-medium capitalize transition-colors duration-200 ${
              activeTab === t.id ? 'bg-lemon-yellow text-dark-indigo' : 'text-lemon-yellow/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Active Tab Content */}
      {activeTab === 'active' && (
        <div className='mt-3'>
          <ActiveBonuses />
        </div>
      )}
      {activeTab === 'available' && (
        <div className='mt-3 w-full'>
          <AvailableBonuses />
        </div>
      )}
      {activeTab === 'rakeback' && (
        <div className='mt-3 w-full'>
          <Rakeback />
        </div>
      )}{' '}
      {activeTab === 'cashback' && (
        <div className='mt-3 w-full'>
          <Cashback />
        </div>
      )}{' '}
      {activeTab === 'history' && (
        <div className='mt-3 w-full'>
          <History />
        </div>
      )}
    </div>
  );
}
