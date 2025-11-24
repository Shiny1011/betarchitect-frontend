'use client';

import { useState } from 'react';

import Dropdown from '@/components/UI/Dropdown';

type BonusStatus = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'FORFEITED';

interface BonusHistoryRecord {
  dateGranted: string;
  bonusId: string;
  bonusType: string;
  freeSpins: number | '-';
  amount: number;
  status: BonusStatus;
}

const bonusHistory: BonusHistoryRecord[] = [
  {
    dateGranted: '25 AUG 2025, 12:34',
    bonusId: 'BNS-10015',
    bonusType: 'WELCOME BONUS',
    freeSpins: '-',
    amount: 50.0,
    status: 'ACTIVE',
  },
  {
    dateGranted: '24 AUG 2025, 18:09',
    bonusId: 'BNS-10014',
    bonusType: 'FREE SPINS',
    freeSpins: '-',
    amount: 30.0,
    status: 'COMPLETED',
  },
  {
    dateGranted: '23 AUG 2025, 09:47',
    bonusId: 'BNS-10012',
    bonusType: 'RELOAD BONUS',
    freeSpins: 20,
    amount: 1500.0,
    status: 'EXPIRED',
  },
  {
    dateGranted: '23 AUG 2025, 17:55',
    bonusId: 'BNS-10009',
    bonusType: 'CASHBACK BONUS',
    freeSpins: '-',
    amount: 200.0,
    status: 'FORFEITED',
  },
  {
    dateGranted: '23 AUG 2025, 17:55',
    bonusId: 'BNS-10005',
    bonusType: 'TOURNAMENT PRIZE',
    freeSpins: '-',
    amount: 40.0,
    status: 'COMPLETED',
  },
];

function statusClass(status: BonusStatus) {
  switch (status) {
    case 'EXPIRED':
      return 'text-red-500';
    default:
      return 'text-lemon-yellow';
  }
}

export const History = () => {
  const [successOpen, setSuccessOpen] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [action, setAction] = useState<'Deposit' | 'Withdraw'>('Deposit');
  const [status, setStatus] = useState<BonusStatus>('ALL');

  return (
    <div className='bg-dark-indigo rounded-2xl p-6'>
      <div className='mb-[18px] flex gap-6'>
        <button className='text-lemon-yellow/50 bg-blue-indigo flex h-[48px] w-[200px] items-center justify-between rounded-xl px-4 text-xs'>
          <span>From Date To Date</span>
        </button>
        <Dropdown
          label='Status'
          value={status}
          onChange={setStatus}
          options={[
            { label: 'All', value: 'ALL' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Completed', value: 'COMPLETED' },
            { label: 'Expired', value: 'EXPIRED' },
            { label: 'Forfeited', value: 'FORFEITED' },
          ]}
          width={181}
          height={48}
        />
      </div>
      <div className='bg-blue-indigo rounded-2xl p-6'>
        <table className='w-full max-w-full min-w-0 table-auto'>
          <thead>
            <tr className='mb-[18px]'>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                Date Granted
              </th>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>Bonus ID</th>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                Bonus Type
              </th>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                Free Spins
              </th>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>Amount</th>
              <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>Status</th>
            </tr>
          </thead>
          <tbody>
            {bonusHistory.map((r, idx) => {
              const isLast = idx === bonusHistory.length - 1;
              const pbClass = isLast ? 'pb-5' : 'pb-8';

              return (
                <tr key={idx}>
                  <td className={`h-full px-3 ${pbClass}`}>
                    <div className='text-lemon-yellow leading-full text-xs'>{r.dateGranted}</div>
                  </td>
                  <td className={`px-3 ${pbClass}`}>
                    <div className='text-lemon-yellow leading-full text-xs'>{r.bonusId}</div>
                  </td>
                  <td className={`px-3 ${pbClass}`}>
                    <div className='text-lemon-yellow leading-full text-xs'>{r.bonusType}</div>
                  </td>
                  <td className={`px-3 ${pbClass}`}>
                    <div className='text-lemon-yellow leading-full text-xs'>{r.freeSpins}</div>
                  </td>
                  <td className={`px-3 ${pbClass}`}>
                    <div className='text-lemon-yellow leading-full text-xs'>{r.amount.toFixed(2)}</div>
                  </td>
                  <td className={`px-3 ${pbClass}`}>
                    <div className={`text-xs font-semibold ${statusClass(r.status)}`}>{r.status}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
