'use client';

import React, { useState } from 'react';

import SelfExclusionSuccessModal from '@/components/Account/Modal/SelfExclusionSuccessModal';
import ConsentCheckbox from '@/components/UI/ConsentCheckbox';
import ConsentRadio from '@/components/UI/ConsentRadio';

export default function SelfExclusion() {
  const [modalOpen, setModalOpen] = useState<null | 'short' | 'long' | 'perm'>(null);

  const [shortBreak, setShortBreak] = useState<'24h' | '7d' | '30d' | null>(null);
  const [longBreak, setLongBreak] = useState<'3m' | '9m' | '1y' | null>(null);
  const [ackPeriod, setAckPeriod] = useState(false);
  const [ackPermanent, setAckPermanent] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);
  const [untilDate, setUntilDate] = useState<Date | null>(null);

  const calcUntilDate = () => {
    const now = new Date();
    if (shortBreak) {
      const d = new Date(now);
      if (shortBreak === '24h') d.setHours(d.getHours() + 24);
      if (shortBreak === '7d') d.setDate(d.getDate() + 7);
      if (shortBreak === '30d') d.setDate(d.getDate() + 30);
      return d;
    }
    if (longBreak) {
      const d = new Date(now);
      if (longBreak === '3m') d.setMonth(d.getMonth() + 3);
      if (longBreak === '9m') d.setMonth(d.getMonth() + 9);
      if (longBreak === '1y') d.setFullYear(d.getFullYear() + 1);
      return d;
    }
    return null;
  };

  const canConfirmShort = ackPeriod && !!shortBreak;
  const canConfirmLong = ackPeriod && !!longBreak;
  const canConfirmPerm = ackPermanent;

  return (
    <div className='w-full space-y-6'>
      {/* Self Exclusion Header */}
      <section className='bg-dark-indigo rounded-2xl p-5'>
        <div className='space-y-3'>
          <h2 className='text-lemon-yellow text-xl font-semibold'>Self Exclusion</h2>
          <p className='text-lemon-yellow/50 text-sm'>
            If you wish to take a break from gambling, you can exclude yourself temporarily or permanently. Once
            confirmed, exclusions cannot be reversed until the chosen period ends
          </p>
          <div>
            <p className='text-lemon-yellow/50 text-sm'>
              Enabling this will permanently disable your account. You will no longer be able to:
            </p>
            <ul className='text-lemon-yellow/50 list-disc space-y-1 pl-6 text-sm'>
              <li>Log in or access the account</li>
              <li>Place bets or play games</li>
              <li>Deposit or withdraw funds</li>
              <li>Change settings or recover the account</li>
            </ul>
            <p className='text-lemon-yellow/50 text-sm'>This action is irreversible.</p>
          </div>

          <div className='mt-6 space-y-1.5'>
            <ConsentCheckbox id='ack_period' checked={ackPeriod} onChange={(e) => setAckPeriod(e.target.checked)}>
              I understand that I will not be able to access my account until the exclusion period has expired
            </ConsentCheckbox>
            <ConsentCheckbox
              id='ack_permanent'
              checked={ackPermanent}
              onChange={(e) => setAckPermanent(e.target.checked)}
            >
              I understand this is permanent and cannot be undone
            </ConsentCheckbox>
          </div>
        </div>

        <div className='mt-6 space-y-3'>
          <h3 className='text-lemon-yellow text-lg font-semibold'>Cooling-off</h3>

          <div className='grid grid-cols-3 gap-[49px]'>
            <div className='bg-blue-indigo flex flex-col justify-between rounded-2xl border border-[#22355A] px-6 py-8'>
              <div className=''>
                <h4 className='text-lemon-yellow mb-4 text-center text-lg font-semibold'>Short Breaks</h4>
                <div className=''>
                  {[
                    { id: '24h', label: '24 Hours' },
                    { id: '7d', label: '7 Days' },
                    { id: '30d', label: '30 Days' },
                  ].map((item) => (
                    <ConsentRadio
                      key={item.id}
                      id={`short-${item.id}`}
                      name='short-break'
                      label={item.label}
                      checked={shortBreak === (item.id as '24h' | '7d' | '30d')}
                      onChange={() => {
                        setShortBreak(item.id as '24h' | '7d' | '30d');
                        // Clear longer exclusion when short break is selected
                        setLongBreak(null);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className='mt-3'>
                <button
                  disabled={!ackPeriod || !shortBreak}
                  onClick={() => {
                    setModalOpen('short');
                    setUntilDate(calcUntilDate());
                    setSuccessOpen(true);
                  }}
                  className={`h-11 w-full cursor-pointer rounded-full text-sm transition-colors ${
                    canConfirmShort ? 'bg-[#FE2D08] text-white' : 'text-lavander/50 bg-dark-indigo'
                  }`}
                >
                  Confirm Exclusion
                </button>
              </div>
            </div>

            {/* Longer Exclusions */}
            <div className='bg-blue-indigo flex flex-col justify-between rounded-2xl border border-[#22355A] px-6 py-8'>
              <div className=''>
                <h4 className='text-lemon-yellow mb-4 text-center text-lg font-semibold'>Longer Exclusions</h4>
                <div className=''>
                  {[
                    { id: '3m', label: '3 Months' },
                    { id: '9m', label: '9 Months' },
                    { id: '1y', label: '1 Year' },
                  ].map((item) => (
                    <ConsentRadio
                      key={item.id}
                      id={`long-${item.id}`}
                      name='long-break'
                      label={item.label}
                      checked={longBreak === (item.id as '3m' | '9m' | '1y')}
                      onChange={() => {
                        setLongBreak(item.id as '3m' | '9m' | '1y');
                        // Clear shorter exclusion when longer exclusion is selected
                        setShortBreak(null);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className='mt-3'>
                <button
                  disabled={!ackPeriod || !longBreak}
                  onClick={() => {
                    setModalOpen('long');
                    setUntilDate(calcUntilDate());
                    setSuccessOpen(true);
                  }}
                  className={`h-11 w-full cursor-pointer rounded-full text-sm transition-colors ${
                    canConfirmLong ? 'bg-[#FE2D08] text-white' : 'text-lavander/50 bg-dark-indigo'
                  }`}
                >
                  Confirm Exclusion
                </button>
              </div>
            </div>

            <div className='bg-blue-indigo flex flex-col justify-between rounded-2xl border border-[#22355A] px-6 py-8'>
              <div className=''>
                <h4 className='text-lemon-yellow mb-4 text-center text-lg font-semibold'>Permanent Self-Exclusion</h4>
                <p className='text-lemon-yellow/50 text-sm'>
                  Access to this account is permanently disabled and cannot be restored.
                </p>
              </div>
              <div className='mt-6'>
                <button
                  disabled={!ackPermanent}
                  onClick={() => {
                    // Clear other selections when choosing permanent exclusion
                    setShortBreak(null);
                    setLongBreak(null);
                    setModalOpen('perm');
                    setUntilDate(null);
                    setSuccessOpen(true);
                  }}
                  className={`h-11 w-full cursor-pointer rounded-full text-sm transition-colors ${
                    canConfirmPerm ? 'bg-[#FE2D08] text-white' : 'text-lavander/50 bg-dark-indigo'
                  }`}
                >
                  Confirm Exclusion
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SelfExclusionSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} until={untilDate} />
    </div>
  );
}
