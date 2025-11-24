'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button, Modal } from '@/components/shared';
import FloatingInput from '@/components/UI/FloatingInput';
import { StepKey } from '@/lib/schema';

import { useVerifyEmail } from '../Contacts/hooks/useVerifyEmail';
import { useVerifyEmailOTP } from '../Contacts/hooks/useVerifyEmailOTP';
import { EmailVerification } from '../Verification/EmailVerification';

const emailSchema = z.object({
  email: z.email('Invalid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface StepConfig {
  title: React.ReactNode;
}

interface EmailVerifyModalProps {
  open: boolean;
  onClose: VoidFunction;
  email: string;
  step?: StepKey;
}

export function EmailVerifyModal({ open, onClose, step = 'init', email }: EmailVerifyModalProps) {
  const t = useTranslations();
  const { mutate: sendEmail, isPending, isError: isErrorEmail } = useVerifyEmail();
  const { mutate: sendEmailOTP, isPending: isPendingOTP, isError: isErrorOTP } = useVerifyEmailOTP();
  const [currentStep, setCurrentStep] = useState<StepKey>(step);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    values: { email },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const stepConfigs: Record<StepKey, StepConfig> = {
    init: {
      title: t('verification.otp.initEmailVerifyTitle'),
    },
    step2: {
      title: t('verification.otp.emailTitle'),
    },
    step3: {
      title: t('verification.otp.emailTitle'),
    },
    success: {
      title: t('verification.success.emailVerifiedTitle'),
    },
    error: {
      title: t('verification.failed.title'),
    },
  };

  const onConfirm: VoidFunction = () => {
    setCurrentStep('step2');
  };

  const onCloseHandler: VoidFunction = () => {
    onClose();
  };

  const onEmailSubmit = ({ email }: EmailFormData) => {
    sendEmail(
      { value: email, type: 'email' },
      {
        onSuccess: () => setCurrentStep('step3'),
        onError: () => setCurrentStep('error'),
      }
    );
  };

  const onCodeResend: VoidFunction = () => {
    sendEmail(
      { value: getValues('email'), type: 'email' },
      {
        onSuccess: () => {
          console.log('Resent OTP');
        },
        onError: () => {
          console.error('Resend OTP failed');
        },
      }
    );
  };

  const onEmailVerify = (code: string): void => {
    sendEmailOTP(
      { token: code, value: getValues('email'), type: 'email' },
      {
        onSuccess: () => setCurrentStep('success'),
      }
    );
  };

  const onStepReset: VoidFunction = () => {
    setCurrentStep(step);
    onClose();
  };

  const isDisabled = isPending || !isValid;

  return (
    <Modal open={open} onClose={onStepReset} title={stepConfigs[currentStep].title}>
      {currentStep === 'init' && (
        <div className='mt-10 flex justify-center gap-3'>
          <Button type='button' onClick={onConfirm} className='w-full'>
            {t('buttons.claim')}
          </Button>
          <Button type='button' onClick={onCloseHandler} className='w-full' variant='secondary' size='lg'>
            {t('buttons.cancel')}
          </Button>
        </div>
      )}
      {currentStep === 'step2' && (
        <>
          <p className='text-lemon-yellow mb-8 text-center'>{t('verification.otp.emailSubtitle')}</p>
          <form onSubmit={handleSubmit(onEmailSubmit)}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <FloatingInput
                  className='w-full'
                  label={t('form.fields.email')}
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Button type='submit' className='mt-10 w-full' size='lg' disabled={isDisabled}>
              {t('buttons.verify')}
            </Button>
          </form>
        </>
      )}
      {currentStep === 'step3' && (
        <EmailVerification
          email={getValues('email')}
          onVerify={onEmailVerify}
          disabled={isPendingOTP}
          resendCode={onCodeResend}
          isError={isErrorOTP || isErrorEmail}
        />
      )}
      {currentStep === 'success' && (
        <p className='text-lemon-yellow mb-4 text-center text-sm'>{t('verification.success.verifiedSubtitle')}</p>
      )}
    </Modal>
  );
}
