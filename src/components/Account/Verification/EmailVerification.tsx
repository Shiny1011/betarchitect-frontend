'use client';

import { useCallback, useEffect, useState } from 'react';

import { OTPInput, SlotProps } from 'input-otp';
import { useTranslations } from 'next-intl';

import { Button, ErrorFormMessage } from '@/components/shared';
import { MAX_OTP_SLOTS } from '@/constants';
import { formatTime } from '@/lib/utils';

interface EmailVerificationProps {
  email: string;
  disabled?: boolean;
  isError?: boolean;
  onVerify: (code: string) => void;
  resendCode?: VoidFunction;
  resendDelay?: number;
}

export function EmailVerification({
  email,
  onVerify,
  resendCode,
  disabled,
  isError,
  resendDelay = 60,
}: EmailVerificationProps) {
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

  const getInfoText = useCallback(() => {
    return t.rich('verification.otp.emailInfo', {
      email: email,
      p: (chunks) => <p className='font-bold'>{chunks}</p>,
    });
  }, [email, t]);

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
      <div className='leading-full text-lemon-yellow mb-8 text-center'>{t('verification.otp.emailSubtitle')}</div>
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
      <div className='text-lavander mt-3 mb-5 text-[12px]'>{getInfoText()}</div>
      {isError && <ErrorFormMessage className='mb-2' message={t('verification.otp.error')} />}
      <Button
        type='button'
        onClick={() => onVerify(code)}
        className='w-full'
        size='lg'
        disabled={code.length !== MAX_OTP_SLOTS || disabled}
      >
        {t('buttons.send')}
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
