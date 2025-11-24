'use client';

import { useEffect, useState } from 'react';

import { OTPInput, SlotProps } from 'input-otp';
import { useTranslations } from 'next-intl';

import { Button, ErrorFormMessage } from '@/components/shared';
import { MAX_OTP_SLOTS } from '@/constants';
import { formatTime } from '@/lib/utils';

interface OTPCodeVerificationProps {
  onVerify: (code: string) => void;
  resendCode?: VoidFunction;
  resendDelay?: number;
  disabled?: boolean;
  isError?: boolean;
}

export function OTPCodeVerification({
  onVerify,
  resendCode,
  resendDelay = 60,
  disabled,
  isError,
}: OTPCodeVerificationProps) {
  const t = useTranslations();
  const [code, setCode] = useState('');
  const [remaining, setRemaining] = useState(resendDelay);

  useEffect(() => {
    setRemaining(resendDelay);

    if (resendDelay <= 0) return;

    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendDelay]);

  function Slot({ isActive, char }: SlotProps) {
    const ringClass = isActive ? 'ring-lemon-yellow' : 'ring-[#22355A]';
    return (
      <div
        className={`bg-dark-indigo/80 text-lemon-yellow flex h-21 w-15 items-center justify-center rounded-[20px] text-2xl ring-1 outline-none ${ringClass}`}
      >
        {char !== null ? <div className='leading-none'>{char}</div> : <span>-</span>}
      </div>
    );
  }

  const handleResend: VoidFunction = () => {
    resendCode?.();
    setRemaining(resendDelay);
  };

  return (
    <div>
      <div className='mt-3 flex items-center justify-center'>
        <OTPInput
          maxLength={MAX_OTP_SLOTS}
          value={code}
          onChange={(v: string) => setCode(v.replace(/\D/g, '').slice(0, MAX_OTP_SLOTS))}
          render={({ slots }) => (
            <div className='flex gap-3'>
              {slots.map((slot, idx) => (
                <Slot key={idx} {...slot} />
              ))}
            </div>
          )}
        />
      </div>
      {isError && <ErrorFormMessage className='mt-2' message={t('verification.otp.error')} />}
      <Button
        type='button'
        disabled={code.length !== MAX_OTP_SLOTS || disabled}
        onClick={() => onVerify(code)}
        className='mt-10 w-full'
        size='lg'
      >
        {t('buttons.verify')}
      </Button>
      {remaining > 0 ? (
        <p className='text-lemon-yellow/50 leading-full mt-3 text-center'>
          {`${t('verification.otp.resendCode')} ${formatTime(remaining)}`}
        </p>
      ) : (
        <div className='flex justify-center'>
          <Button variant='underline' className='mt-3 text-center' onClick={handleResend}>
            {t('buttons.resend')}
          </Button>
        </div>
      )}
    </div>
  );
}
