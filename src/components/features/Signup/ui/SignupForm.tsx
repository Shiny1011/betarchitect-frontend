import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button, ErrorFormMessage } from '@/components/shared';
import Dropdown from '@/components/UI/Dropdown';
import FloatingInput from '@/components/UI/FloatingInput';
import { EyeIcon } from '@/Icons';
import { FIAT_CURRENCIES } from '@/lib/currency';

import { useSignup } from '../hooks/useSignup';

interface SignupFormProps {
  onClose?: VoidFunction;
  onSuccess?: VoidFunction;
}

const signupSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z
      .string()
      .nonempty('Confirm Password is required')
      .min(8, 'Confirm Password must be at least 8 characters long'),
    currency: z.string().optional(),
    promoCode: z.string().optional(),
    agreement1: z.boolean().refine((val) => val === true, 'Agreement is required'),
    agreement2: z.boolean().optional(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    const pass = password?.trim();
    const confirmPass = confirmPassword?.trim();

    if (!pass || !confirmPass) return;

    if (pass !== confirmPass) {
      ctx.addIssue({ code: 'custom', path: ['password'], message: 'Passwords must match' });
      ctx.addIssue({ code: 'custom', path: ['confirmPassword'], message: 'Passwords must match' });
    }
  });

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = ({ onClose, onSuccess }: SignupFormProps) => {
  const t = useTranslations();
  const { mutateAsync, isError } = useSignup();

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      currency: FIAT_CURRENCIES[0].code,
      promoCode: '',
      agreement1: false,
      agreement2: false,
    },
    mode: 'all',
  });

  const handleSignupFormSubmit = async (formData: SignupFormData) => {
    await mutateAsync({
      email: formData.email,
      password: formData.password,
      currency: formData.currency ?? FIAT_CURRENCIES[0].code,
      promo_code: formData.promoCode,
      market_agreement: formData.agreement1,
    });
    onClose?.();
    onSuccess?.();
  };

  const isDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <form onSubmit={handleSubmit(handleSignupFormSubmit)} className='mt-6 md:mt-8'>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <FloatingInput
            className='mb-3 md:mb-6'
            label={t('auth.signup.email')}
            type='email'
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <FloatingInput
            className='mb-3 md:mb-6'
            type={showPwd ? 'text' : 'password'}
            label={t('auth.signup.password')}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (getValues('confirmPassword')) trigger(['password', 'confirmPassword']);
            }}
            error={!!errors.password}
            helperText={errors.password?.message}
            rightAdornment={
              <Button
                type='button'
                variant='ghost'
                onClick={() => setShowPwd((s) => !s)}
                className='h-6 w-6'
                aria-label='Toggle password visibility'
              >
                <EyeIcon open={showPwd} size={16} />
              </Button>
            }
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        render={({ field }) => (
          <FloatingInput
            className='mb-6'
            label={t('auth.signup.confirmPassword')}
            type={showConfirmPwd ? 'text' : 'password'}
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (getValues('password')) void trigger(['password', 'confirmPassword']);
            }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            rightAdornment={
              <Button
                type='button'
                variant='ghost'
                onClick={() => setShowConfirmPwd((s) => !s)}
                className='h-6 w-6'
                aria-label='Toggle confirm password visibility'
              >
                <EyeIcon open={showConfirmPwd} size={16} />
              </Button>
            }
          />
        )}
      />

      <p className='text-lemon-yellow mb-3 text-[12px] md:mb-4 md:text-sm'>{t('common.currency.title')}</p>
      <Controller
        name='currency'
        control={control}
        render={({ field }) => (
          <Dropdown
            className='mb-4 md:mb-6'
            label={t('common.currency.title')}
            options={FIAT_CURRENCIES.map((c) => ({ label: c.name, value: c.code }))}
            height={48}
            dropdownColor='bg-dark-indigo'
            {...field}
          />
        )}
      />
      <Controller
        name='promoCode'
        control={control}
        render={({ field }) => <FloatingInput label={t('auth.signup.promoCode')} {...field} />}
      />

      {/* TODO: Create Agreements component */}
      <div className='mt-8 mb-6 md:mb-8'>
        <label className='mb-3 flex items-start gap-3 md:mb-4.5'>
          <Controller
            name='agreement1'
            control={control}
            render={({ field }) => {
              const { value, ...rest } = field;
              return <input type='checkbox' className='accent-lemon-yellow md:mt-1' checked={value} {...rest} />;
            }}
          />
          <span className='text-lemon-yellow/50 text-[12px] md:text-sm'>
            {t.rich('auth.signup.termsAgreement', {
              link: (chunks) => (
                <Button type='button' variant='underline' className='md:ml-1'>
                  {chunks}
                </Button>
              ),
            })}
          </span>
        </label>
        <label className='flex items-start gap-3'>
          <Controller
            name='agreement2'
            control={control}
            render={({ field }) => {
              const { value, ...rest } = field;
              return <input type='checkbox' className='accent-lemon-yellow md:mt-1' checked={value} {...rest} />;
            }}
          />
          <span className='text-lemon-yellow/50 text-[12px] md:text-sm'>{t('auth.signup.marketingAgreement')}</span>
        </label>
      </div>
      {isError && <ErrorFormMessage className='mb-4' message={t('auth.signup.errorMessage')} />}
      <Button type='submit' className='mb-4.5 h-9 w-full md:mb-3 md:h-12' disabled={isDisabled}>
        {t('auth.signup.btn')}
      </Button>
    </form>
  );
};
