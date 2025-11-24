'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ErrorFormMessage } from '@/components/shared';
import FloatingInput from '@/components/UI/FloatingInput';
import { EyeIcon } from '@/Icons';

import { useLogin } from '../hooks/useLogin';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onPassForgot?: VoidFunction;
  onClose?: VoidFunction;
}

export function LoginForm({ onPassForgot, onClose }: LoginFormProps) {
  const t = useTranslations();
  const { mutateAsync, isError } = useLogin();
  const [showPwd, setShowPwd] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const handleLoginFormSubmit = async (formData: LoginFormData) => {
    await mutateAsync(formData);
    onClose?.();
  };

  const isDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <form onSubmit={handleSubmit(handleLoginFormSubmit)} className='mt-6 mb-3 md:mt-8'>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <FloatingInput
            label={t('auth.login.email')}
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
            label={t('auth.login.password')}
            type={showPwd ? 'text' : 'password'}
            {...field}
            className='mt-4.5 md:mt-6'
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
      <Button onClick={onPassForgot} type='button' size='link' variant='link' className='mt-2 max-md:text-sm'>
        {t('auth.login.forgotPassword')}
      </Button>
      {isError && <ErrorFormMessage className='mt-4' message={t('auth.login.errorMessage')} />}
      <Button type='submit' className='mt-8 h-9 w-full md:h-12' disabled={isDisabled}>
        {t('auth.login.btn')}
      </Button>
    </form>
  );
}
