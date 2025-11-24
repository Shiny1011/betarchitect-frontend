'use client';

import { useState } from 'react';

import Accordion from '@/components/UI/Accordion';
import { CiLockIcon } from '@/Icons';
import { VipLevel } from '@/lib/schema';

interface VipPageClientProps {
  vipLevels: VipLevel[];
}

const VipLevelCard = () => {
  return (
    <div className='bg-dark-indigo w-[303px] flex-shrink-0 rounded-[16px] p-6'>
      <div className='flex w-full flex-col items-center justify-center gap-[10px]'>
        <div className='bg-blue-indigo mt-[8px] h-[86px] w-[86px] rounded-full' />
        <div className='text-[22px] font-bold'>Bronze</div>
      </div>

      <div className='my-[10px] flex w-full items-center justify-between'>
        <div className='text-sm font-semibold'>Wager Amount</div>
        <div className='text-sm font-semibold'>0</div>
      </div>

      <div className='mb-[14px] flex w-full items-center justify-between'>
        <div className='text-xs'>Cashback</div>
        <div className='text-lavander text-xs'>0,07%</div>
      </div>

      <div className='mb-[7px] flex w-full items-center justify-between'>
        <div className='text-xs'>Rakeback</div>
        <div className='text-lavander text-xs'>0,07%</div>
      </div>

      <div className='flex w-full flex-col gap-[6px]'>
        {[
          'Weekly Bonus',
          'Monthly Bonus',
          'Personalised Bonuses',
          'Renewable Reloads',
          'Level Up Bonus',
          'Personal VIP Manager',
          'VIP Events',
          'Luxury Gifts',
        ].map((item, idx) => (
          <div className='flex w-full items-center justify-between' key={idx}>
            <div className='text-lemon-yellow/50 text-xs'>{item}</div>
            <div className='p-[3.5px]'>
              <CiLockIcon opacity={0.5} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export function VipPageClient({ vipLevels }: VipPageClientProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqs = [
    {
      title: 'What is this about?',
      content: (
        <>
          This Privacy Policy outlines the ways in which [Casino Name] ("we," "our," or "us") collects, uses, and
          protects your personal information when you access or use our online casino services ("Services").
          <br />
          <br />
          By registering an account or using our website, you agree to the terms described in this policy.
        </>
      ),
    },
    {
      title: 'Deposit Points',
      content: <>Earn points for every qualifying deposit. Points can unlock exclusive tiers and rewards.</>,
    },
    ...Array.from({ length: 5 }, () => ({
      title: 'Warge Points',
      content: (
        <>Points accumulate as you wager on eligible games. Higher wager activity yields more points and benefits.</>
      ),
    })),
  ];

  return (
    <div className='w-full'>
      <div className='bg-dark-indigo relative h-[363px] w-full rounded-[16px]'>
        <div className='absolute bottom-8 left-5'>
          <div className='text-[32px] font-bold uppercase'>The unrivalled VIP experience</div>
          <div className='text-lavander mt-1 text-sm capitalize'>
            Unlock exclusive benefits and receive instantly <br /> withdrawable bonuses without any strings attached
          </div>
        </div>
      </div>

      <div className='hide-scrollbar mt-[42px] flex items-stretch justify-start gap-6 overflow-x-auto'>
        <div className='sticky left-0 z-10 w-[264px] flex-none'>
          {/* Wager progress card per design */}
          <div className='bg-dark-indigo w-[264px] rounded-[16px] p-6'>
            {/* Top avatars and labels */}
            <div className='flex w-full items-start justify-between'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='h-[46px] w-[46px] rounded-full bg-[#22355A]' />
                <div className='leading-tight font-bold uppercase'>TEXT</div>
              </div>
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='h-[46px] w-[46px] rounded-full bg-[#22355A]' />
                <div className='leading-tight font-bold uppercase'>TEXT</div>
              </div>
            </div>

            {/* Wagered row */}
            <div className='mt-4 flex items-center justify-between'>
              <div className='text-[10px] leading-tight'>Wagered</div>
              <div className='text-lemon-yellow/50 text-[10px] leading-tight'>150$ / 2500$</div>
            </div>

            {/* Progress bar */}
            <div className='bg-blue-indigo mt-2 h-[6px] w-full rounded-full'>
              <div className='bg-lemon-yellow h-[6px] w-[6%] rounded-full'></div>
            </div>
          </div>

          <div className='bg-dark-indigo mt-6 h-[340px] w-[264px] rounded-[16px]'></div>
        </div>

        {Array.from({ length: 4 }).map((_, i) => (
          <VipLevelCard key={i} />
        ))}
      </div>

      <div className='mt-[48px] mb-[32px] text-[22px] font-semibold'>Frequently Asked Questions</div>

      <div className='space-y-3'>
        {faqs.map((faq, idx) => (
          <Accordion
            key={idx}
            title={faq.title}
            open={openIndex === idx}
            onToggle={(next) => setOpenIndex(next ? idx : -1)}
          >
            {faq.content}
          </Accordion>
        ))}
      </div>
    </div>
  );
}
