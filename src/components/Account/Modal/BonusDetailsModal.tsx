'use client';

import Image from 'next/image';

import { Modal } from '@/components/shared';

interface BonusDetailsModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export function BonusDetailsModal({ open, onClose }: BonusDetailsModalProps) {
  return (
    <Modal open={open} onClose={onClose} fullscreenOnMobile>
      <div className='bg-dark-indigo relative mb-2 h-[164px] w-full overflow-hidden rounded-xl'>
        <Image src='/images/bonuses/welcome-bonus.jpg' alt='Welcome Bonus' fill className='object-cover' />
      </div>
      <h3 className='text-lavander font-bold md:text-xl'>Welcome Bonus – €100 + 50 Free Spins</h3>
      <p className='text-lavander mb-3 max-md:text-sm'>Status: Active</p>
      <div className='max-h-[290px] overflow-y-auto'>
        <div className='mb-4'>
          <div className='text-lemon-yellow text-sm font-bold'>Bonus Info</div>
          <div className='mt-2 space-y-2 text-sm'>
            <div>
              <span className='text-lemon-yellow/60'>Wagering Requirement:</span>{' '}
              <span className='text-lavander'>x35 (bonus amount)</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Eligible Games:</span>{' '}
              <span className='text-lavander'>Slots only (excl. jackpots)</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Maximum Bet:</span>{' '}
              <span className='text-lavander'>€5 per spin / €10 per hand</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Minimum Odds (Sports):</span>{' '}
              <span className='text-lavander'>1.80 or higher</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Eligible Products:</span>{' '}
              <span className='text-lavander'>Casino & Live Casino</span>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <div className='text-lemon-yellow text-sm font-bold'>Bonus Info</div>
          <div className='mt-2 space-y-2 text-sm'>
            <div>
              <span className='text-lemon-yellow/60'>Wagering Requirement:</span>{' '}
              <span className='text-lavander'>x35 (bonus amount)</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Eligible Games:</span>{' '}
              <span className='text-lavander'>Slots only (excl. jackpots)</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Maximum Bet:</span>{' '}
              <span className='text-lavander'>€5 per spin / €10 per hand</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Minimum Odds (Sports):</span>{' '}
              <span className='text-lavander'>1.80 or higher</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Eligible Products:</span>{' '}
              <span className='text-lavander'>Casino & Live Casino</span>
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <div className='text-lemon-yellow text-sm font-bold'>Timeline</div>
          <div className='mt-2 space-y-2 text-sm'>
            <div>
              <span className='text-lemon-yellow/60'>Activated on:</span>{' '}
              <span className='text-lavander'>1 September 2025, 14:32</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Expires on:</span>{' '}
              <span className='text-lavander'>18 September 2025, 23:59</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Maximum Bet:</span>{' '}
              <span className='text-lavander'>€5 per spin / €10 per hand</span>
            </div>
            <div>
              <span className='text-lemon-yellow/60'>Progress:</span> <span className='text-lavander'>€230 / €700</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
