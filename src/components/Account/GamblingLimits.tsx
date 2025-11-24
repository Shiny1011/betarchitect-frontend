'use client';

import React, { useState } from 'react';

import Dropdown from '@/components/UI/Dropdown';
import FloatingInput from '@/components/UI/FloatingInput';

function StableSection({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  action: React.ReactNode;
}) {
  return (
    <section className='bg-dark-indigo rounded-[12px] p-6'>
      <div className='space-y-0.5'>
        <h3 className='text-lemon-yellow text-xl font-semibold'>{title}</h3>
        <p className='text-lemon-yellow/70 text-sm'>{description}</p>
      </div>
      <div className='mt-6 flex items-center gap-4'>
        <div className='flex flex-1 flex-wrap items-center gap-4'>{children}</div>
        <div className='flex justify-end'>{action}</div>
      </div>
    </section>
  );
}

export default function GamblingLimits() {
  const [depositPeriod, setDepositPeriod] = useState<string>('day');
  const [depositAmount, setDepositAmount] = useState('');

  const [wagerPeriod, setWagerPeriod] = useState<string>('day');
  const [wagerAmount, setWagerAmount] = useState('');

  const [sessions, setSessions] = useState('');
  const [sessionDays, setSessionDays] = useState('');
  const [sessionDuration, setSessionDuration] = useState('');

  const hasValue = (v: string) => v.trim().length > 0;

  const canSetDeposit = hasValue(depositAmount);
  const canSetWager = hasValue(wagerAmount);
  const canSetSessions = hasValue(sessions) || hasValue(sessionDays) || hasValue(sessionDuration);

  return (
    <div className='space-y-6'>
      <StableSection
        title='Deposit Limits'
        description='Your account can be set with deposit limits. This setting limits the amount you can deposit per day, week or month'
        action={
          <button
            disabled={!canSetDeposit}
            className={
              'text-blue-indigo jsutify between flex h-12 items-center rounded-full px-8 text-sm ' +
              (canSetDeposit ? 'text-blue-indigo bg-[#6698FF]' : 'text-lavander/50 cursor-not-allowed bg-[#22355A]')
            }
          >
            Set Limit
          </button>
        }
      >
        <Dropdown
          label='Limit on'
          value={depositPeriod}
          onChange={setDepositPeriod}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]}
          height={48}
          width={241}
        />
        <div className='w-[280px]'>
          <FloatingInput
            label='Enter amount'
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </div>
      </StableSection>

      <StableSection
        title='Wager Limits'
        description='Your account can be set with wager limits. This setting controls the amount of money you can wager per day, week or month'
        action={
          <button
            disabled={!canSetWager}
            className={
              'text-blue-indigo jsutify between flex h-12 items-center rounded-full px-8 text-sm ' +
              (canSetWager ? 'text-blue-indigo bg-[#6698FF]' : 'text-lavander/50 cursor-not-allowed bg-[#22355A]')
            }
          >
            Set Limit
          </button>
        }
      >
        <Dropdown
          label='Limit on'
          value={wagerPeriod}
          onChange={setWagerPeriod}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]}
          height={48}
          width={241}
        />
        <div className='w-[280px]'>
          <FloatingInput label='Enter amount' value={wagerAmount} onChange={(e) => setWagerAmount(e.target.value)} />
        </div>
      </StableSection>

      <StableSection
        title='Session Limits'
        description='The restriction takes effect instantly. If you hit the limit, you will be automatically logged out of your account'
        action={
          <button
            disabled={!canSetSessions}
            className={
              'text-blue-indigo jsutify between flex h-12 items-center rounded-full px-8 text-sm ' +
              (canSetSessions ? 'text-blue-indigo bg-[#6698FF]' : 'text-lavander/50 cursor-not-allowed bg-[#22355A]')
            }
          >
            Set Limit
          </button>
        }
      >
        <div className='w-[220px]'>
          <FloatingInput label='Sessions' value={sessions} onChange={(e) => setSessions(e.target.value)} />
        </div>
        <div className='w-[220px]'>
          <FloatingInput label='Days' value={sessionDays} onChange={(e) => setSessionDays(e.target.value)} />
        </div>
        <div className='w-[220px]'>
          <FloatingInput
            label='Duration'
            type='text'
            value={sessionDuration}
            onChange={(e) => setSessionDuration(e.target.value)}
          />
        </div>
      </StableSection>
    </div>
  );
}
