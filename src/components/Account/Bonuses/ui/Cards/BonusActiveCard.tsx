import { useTranslations } from 'next-intl';

import { Button, ProgressBar } from '@/components/shared';
import { CurrencyCode } from '@/lib/currency';

interface BonusActiveCardProps {
  onDetailsClick: VoidFunction;
  onForfeitClick: VoidFunction;
  title?: string;
  description?: string;
  inProgress?: string;
  maxProgress?: number;
  minProgress?: number;
  timeLeft?: string;
  currencyCode?: CurrencyCode;
  isForfeiting?: boolean;
}

export const BonusActiveCard = (props: BonusActiveCardProps) => {
  const {
    onDetailsClick,
    onForfeitClick,
    title = 'Casino bonus',
    description = 'Verify your phone number to be the first to know about our bonus offers and exciting promos!',
    inProgress = 'In Progress',
    maxProgress = 300,
    minProgress = 200,
    timeLeft = '9d:9h:15m',
    currencyCode = CurrencyCode.EUR,
    isForfeiting = false,
  } = props;
  const t = useTranslations();

  return (
    <div className='bg-dark-indigo relative flex min-h-[246px] flex-col justify-between rounded-2xl p-6 shadow-md'>
      <div className=''>
        <div className='flex items-start justify-between'>
          <div className='space-y-[6px]'>
            <div className='text-lemon-yellow text-[16px] font-bold'>{title}</div>
            <p className='text-lemon-yellow text-xs font-light'>{description}</p>
          </div>
        </div>
        <div className='mt-4 space-y-2'>
          <div className='flex w-full items-center justify-between'>
            <div className='text-lavander text-[10px] capitalize'>{inProgress}</div>
            <div className='text-lavander text-[10px] capitalize'>
              {minProgress} / {maxProgress} {CurrencyCode[currencyCode]}
            </div>
          </div>
          <ProgressBar value={minProgress} total={maxProgress} variant={'default'} />
          <div className='flex items-center'>
            <div className='text-lemon-yellow/50 text-[10px] leading-tight capitalize'>
              {t('common.time.left')}:
              <span className='text-lemon-yellow ml-1 text-[10px] leading-tight capitalize'>{timeLeft}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-3'>
        <Button onClick={onDetailsClick} className='w-full rounded-full text-xs md:font-medium'>
          {t('buttons.details')}
        </Button>
        <Button
          disabled={isForfeiting}
          onClick={onForfeitClick}
          variant='secondary'
          className='text-lemon-yellow border-lemon-yellow h-8 w-full rounded-full bg-transparent text-xs font-medium'
        >
          {t('buttons.forfeit')}
        </Button>
      </div>
    </div>
  );
};
