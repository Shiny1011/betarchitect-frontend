'use client';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button, ErrorFormMessage, Modal } from '@/components/shared';
import CountryCodeSelect from '@/components/UI/CountryCodeSelect';
import FloatingInput from '@/components/UI/FloatingInput';
import { DEFAULT_PREFIX } from '@/constants';
import { StepKey } from '@/lib/schema';

import { useSendPhoneOTP } from '../Contacts/hooks/useSendPhoneOTP';
import { useVerifyPhoneOTP } from '../Contacts/hooks/useVerifyPhoneOTP';
import { OTPCodeVerification } from '../Verification/OTPCodeVerification';

const phoneSchema = z.object({
  phone_number: z.string().nonempty('Phone number is required').min(8, 'Phone number is too short'),
  phone_code: z.string(),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

interface StepConfig {
  title: React.ReactNode;
}

interface PhoneVerifyModalProps {
  open: boolean;
  onClose: VoidFunction;
  phoneNumber: string;
  step?: StepKey;
}

export function PhoneVerifyModal({ open, onClose, step = 'init', phoneNumber }: PhoneVerifyModalProps) {
  const t = useTranslations();
  const { mutate: sendPhoneOTP, isPending, isError: isErrorPhone } = useSendPhoneOTP();
  const { mutate: verifyPhoneOTP, isPending: isVerifying, isError: isErrorOTP } = useVerifyPhoneOTP();
  const [currentStep, setCurrentStep] = useState<StepKey>(step);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    values: {
      phone_number: phoneNumber,
      phone_code: DEFAULT_PREFIX,
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const stepConfigs: Record<StepKey, StepConfig> = {
    init: {
      title: t('verification.otp.initVerification'),
    },
    step2: {
      title: t('verification.otp.title'),
    },
    step3: {
      title: t.rich('verification.otp.codeSent', {
        phone: `${getValues('phone_code')}${getValues('phone_number')}`,
        p: (chunks) => <p>{chunks}</p>,
      }),
    },
    success: {
      title: t('verification.success.phoneVerifiedTitle'),
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

  const onStepReset = () => {
    setCurrentStep(step);
    onClose();
  };

  const onPhoneSubmit = (formData: PhoneFormData): void => {
    sendPhoneOTP(formData, {
      onSuccess: () => setCurrentStep('step3'),
      onError: () => setCurrentStep('error'),
    });
  };

  const onOTPVerify = (otpCode: string): void => {
    verifyPhoneOTP(
      { code: otpCode, phone_code: getValues('phone_code'), phone_number: getValues('phone_number') },
      {
        onSuccess: () => setCurrentStep('success'),
      }
    );
  };

  const onCodeResend: VoidFunction = () => {
    sendPhoneOTP(getValues(), {
      onSuccess: () => setCurrentStep('step3'),
    });
  };

  const isDisabled = isPending || !isValid;

  return (
    <Modal open={open} onClose={onStepReset} title={stepConfigs[currentStep].title}>
      {currentStep === 'init' && (
        <div className='mt-10 flex justify-center gap-3'>
          <Button type='button' onClick={onConfirm} className='w-full'>
            {t('buttons.confirm')}
          </Button>
          <Button type='button' onClick={onCloseHandler} className='w-full' variant='secondary' size='lg'>
            {t('buttons.cancel')}
          </Button>
        </div>
      )}
      {currentStep === 'step2' && (
        <>
          <p className='text-lemon-yellow text-center text-sm'>{t('verification.otp.confirmPhone')}</p>
          <form onSubmit={handleSubmit(onPhoneSubmit)} className='mt-10 flex flex-col'>
            <div className='mb-2 flex items-center gap-4'>
              <Controller
                name='phone_code'
                control={control}
                render={({ field }) => (
                  <CountryCodeSelect
                    className='shrink-0'
                    value={field.value}
                    onChange={(dial) => field.onChange(dial)}
                  />
                )}
              />
              <Controller
                name='phone_number'
                control={control}
                render={({ field }) => <FloatingInput className='w-full' label={t('form.fields.phone')} {...field} />}
              />
            </div>
            {!!errors.phone_number && <ErrorFormMessage message={errors.phone_number.message!} />}
            <Button type='submit' size='lg' disabled={isDisabled} className='mt-10'>
              {t('buttons.verify')}
            </Button>
          </form>
        </>
      )}
      {currentStep === 'step3' && (
        <OTPCodeVerification
          disabled={isVerifying}
          onVerify={onOTPVerify}
          resendCode={onCodeResend}
          isError={isErrorOTP || isErrorPhone}
        />
      )}
      {currentStep === 'success' && (
        <p className='text-lemon-yellow mb-4 text-center text-sm'>{t('verification.success.verifiedSubtitle')}</p>
      )}
      {currentStep === 'error' && (
        <p className='text-lemon-yellow mb-4 text-center text-sm'>{t('verification.failed.subtitle')}</p>
      )}
    </Modal>
  );
}
