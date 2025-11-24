'use client';

import { useMemo, useState } from 'react';

import Dropdown from '@/components/UI/Dropdown';

type SubTab = 'deposit' | 'withdrawal' | 'casino' | 'betting';

export interface HistoryRecord {
  dateTime: string;
  transactionId: string;
  paymentMethod: 'CARD' | 'BANK' | 'CRYPTO' | 'EWALLET';
  currency: 'EUR' | 'USD';
  amount: number;
  status: 'PAID' | 'PENDING' | 'CANCELLED' | 'APPROVED';
}

export const mockData: HistoryRecord[] = [
  {
    dateTime: '25 AUG 2025, 12:34',
    transactionId: 'TXN-84573219',
    paymentMethod: 'CARD',
    currency: 'EUR',
    amount: 50.0,
    status: 'PAID',
  },
  {
    dateTime: '24 AUG 2025, 18:09',
    transactionId: 'TXN-84571102',
    paymentMethod: 'BANK',
    currency: 'EUR',
    amount: 30.0,
    status: 'PENDING',
  },
  {
    dateTime: '23 AUG 2025, 09:47',
    transactionId: 'TXN-84569058',
    paymentMethod: 'CRYPTO',
    currency: 'EUR',
    amount: 1500.0,
    status: 'CANCELLED',
  },
  {
    dateTime: '23 AUG 2025, 17:55',
    transactionId: 'TXN-84570077',
    paymentMethod: 'EWALLET',
    currency: 'EUR',
    amount: 200.0,
    status: 'APPROVED',
  },
  {
    dateTime: '23 AUG 2025, 17:55',
    transactionId: 'TXN-84572011',
    paymentMethod: 'EWALLET',
    currency: 'EUR',
    amount: 40.0,
    status: 'PAID',
  },
];

function statusClass(status: HistoryRecord['status']) {
  switch (status) {
    case 'PAID':
      return 'text-[#76C24D]';
    case 'APPROVED':
      return 'text-[#76C24D]';
    case 'PENDING':
      return 'text-yellow-400';
    case 'CANCELLED':
      return 'text-red-500';
    default:
      return 'text-lavander';
  }
}

export default function History() {
  const [subTab, setSubTab] = useState<SubTab>('withdrawal');
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [action, setAction] = useState<'Deposit' | 'Withdraw'>('Deposit');
  const [status, setStatus] = useState<'ALL' | HistoryRecord['status']>('ALL');

  const filtered = useMemo(() => {
    return mockData.filter((r) => r.currency === currency && (status === 'ALL' ? true : r.status === status));
  }, [currency, status]);

  const tabs: { id: SubTab; label: string }[] = [
    { id: 'deposit', label: 'Deposit' },
    { id: 'withdrawal', label: 'Withdrawal' },
    { id: 'casino', label: 'Casino History' },
    { id: 'betting', label: 'Betting History' },
  ];

  return (
    <div className='bg-dark-indigo rounded-2xl p-6'>
      <h2 className='mb-6 text-xl font-semibold'>History</h2>

      {/* Sub Tabs */}
      <div className='mb-[18px] flex'>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className='text-lemon-yellow/50 hover:text-lemon-yellow relative cursor-pointer p-2.5 text-base font-medium transition-all duration-300'
          >
            <span className={`${subTab === t.id && 'text-lemon-yellow'}`}>{t.label}</span>

            <span
              className={`bg-lemon-yellow absolute bottom-0 left-0 ${
                subTab === t.id ? 'opacity-100' : 'opacity-0'
              } h-[2px] w-full rounded-full transition-all duration-300`}
            />
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className='mb-[18px] flex gap-6'>
        <button className='text-lemon-yellow/50 bg-blue-indigo flex h-[48px] w-[200px] items-center justify-between rounded-xl px-4 text-xs'>
          <span>From Date To Date</span>
        </button>
        <Dropdown
          label='Currency'
          value={currency}
          onChange={setCurrency}
          options={[
            { label: 'EUR', value: 'EUR' },
            { label: 'USD', value: 'USD' },
          ]}
          width={181}
          height={48}
        />
        <Dropdown
          label='Action'
          value={action}
          onChange={setAction}
          options={[
            { label: 'Deposit', value: 'Deposit' },
            { label: 'Withdraw', value: 'Withdraw' },
          ]}
          width={181}
          height={48}
        />
        <Dropdown
          label='Status'
          value={status}
          onChange={setStatus}
          options={[
            { label: 'All', value: 'ALL' },
            { label: 'Paid', value: 'PAID' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Cancelled', value: 'CANCELLED' },
            { label: 'Approved', value: 'APPROVED' },
          ]}
          width={181}
          height={48}
        />
      </div>

      {/* Table */}
      <div className='bg-blue-indigo rounded-2xl p-6'>
        <div className='overflow-x-scroll'>
          <table className='w-full max-w-full min-w-0 table-auto'>
            <thead>
              <tr className='mb-[18px]'>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                  Date &amp; Time
                </th>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                  Transaction ID
                </th>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                  Payment Method
                </th>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>
                  Currency
                </th>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>Amount</th>
                <th className='text-lemon-yellow/50 px-3 pb-[18px] text-left text-xs font-medium uppercase'>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => {
                const isLast = idx === filtered.length - 1;
                const pbClass = isLast ? 'pb-5' : 'pb-8';

                return (
                  <tr key={idx}>
                    <td className={`h-full px-3 ${pbClass}`}>
                      <div className='text-lemon-yellow leading-full text-xs'>{r.dateTime}</div>
                    </td>
                    <td className={`px-3 ${pbClass}`}>
                      <div className='text-lemon-yellow leading-full text-xs'>{r.transactionId}</div>
                    </td>
                    <td className={`px-3 ${pbClass}`}>
                      <div className='text-lemon-yellow leading-full text-xs'>{r.paymentMethod}</div>
                    </td>
                    <td className={`px-3 ${pbClass}`}>
                      <div className='text-lemon-yellow leading-full text-xs'>{r.currency}</div>
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
    </div>
  );
}
