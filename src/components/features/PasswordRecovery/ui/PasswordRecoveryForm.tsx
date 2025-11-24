import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button, ErrorFormMessage } from '@/components/shared';
import FloatingInput from '@/components/UI/FloatingInput';

import { usePasswordRecovery } from '../hooks/usePasswordRecovery';

interface PasswordRecoveryFormProps {
  onSuccess?: VoidFunction;
}

const passwordRecoverySchema = z.object({
  email: z.email('Invalid email address'),
});

type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;

export const PasswordRecoveryForm = ({ onSuccess }: PasswordRecoveryFormProps) => {
  const t = useTranslations();
  const { mutateAsync, isError } = usePasswordRecovery();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
    },
    mode: 'all',
  });

  const onEmailSubmit = async (formData: PasswordRecoveryFormData) => {
    await mutateAsync(formData);
    onSuccess?.();
  };

  const isDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <form onSubmit={handleSubmit(onEmailSubmit)} className='mt-3.5 space-y-8'>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <FloatingInput
            className='w-full'
            label={t('auth.forgotPassword.email')}
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      {isError && <ErrorFormMessage message={t('auth.forgotPassword.errorMessage')} />}
      <Button className='h-9 w-full max-md:text-sm md:h-12' disabled={isDisabled}>
        {t('buttons.claim')}
      </Button>
    </form>
  );
};
