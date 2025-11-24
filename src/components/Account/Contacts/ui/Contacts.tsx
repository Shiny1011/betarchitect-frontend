'use client';
import { useState, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button } from '@/components/shared';
import FloatingInput from '@/components/UI/FloatingInput';
import { useUserCache } from '@/lib/hooks';
import { phoneValidationSchema } from '@/lib/validation';

import { EmailVerifyModal } from '../../Modal/EmailVerifyModal';
import { PhoneVerifyModal } from '../../Modal/PhoneVerifyModal';

const contactsSchema = z.object({
  email: z.email('Invalid email address'),
  phone: phoneValidationSchema,
});

type ContactsFormData = z.infer<typeof contactsSchema>;

export const Contacts = () => {
  const t = useTranslations();
  const { user } = useUserCache();

  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [isPhoneVerifyModalOpen, setIsPhoneVerifyModalOpen] = useState(false); // Phone verify flow state
  const [isEmailVerifyModalOpen, setIsEmailVerifyModalOpen] = useState(false); // Email verify flow state

  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    getValues,
    formState: { errors },
  } = useForm<ContactsFormData>({
    resolver: zodResolver(contactsSchema),
    values: {
      email: user?.email || '',
      phone: user?.phone || '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
  });

  // Trigger multi-step phone verify flow
  const onPhoneVerifyClick: VoidFunction = () => {
    setEditingPhone(false);
    setIsPhoneVerifyModalOpen(true);
  };
  const onPhoneEditClick: VoidFunction = () => {
    setEditingPhone(true);
    phoneInputRef.current?.focus();
  };

  // Trigger multi-step email verify flow
  const onEmailVerifyClick: VoidFunction = () => {
    setEditingEmail(false);
    setIsEmailVerifyModalOpen(true);
  };
  const onEmailEditClick: VoidFunction = () => {
    setEditingEmail(true);
    emailInputRef.current?.focus();
  };

  const isSavePhoneDisabled = !!errors.phone;
  const isSaveEmailDisabled = !!errors.email;

  return (
    <section className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
      <div className='mb-6'>
        <h2 className='text-lemon-yellow text-[20px] font-semibold'>Contacts</h2>
        <p className='text-lemon-yellow/50 text-sm'>To edit the verified fields, please contact support</p>
      </div>
      <div className='space-y-[18px]'>
        <Controller
          name='phone'
          control={control}
          render={({ field }) => (
            <FloatingInput
              inputRef={phoneInputRef}
              label='Phone number'
              inputClassName={editingPhone ? '' : 'pointer-events-none'}
              {...field}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              rightAdornment={
                <div>
                  {!user?.phone_verified && (
                    <Button
                      onClick={onPhoneVerifyClick}
                      variant='secondary_soft'
                      className='mr-2 rounded-full px-3 py-1 text-xs'
                    >
                      {t('buttons.verify')}
                    </Button>
                  )}
                  <Button
                    disabled={editingPhone ? isSavePhoneDisabled : !user?.phone_verified}
                    onClick={editingPhone ? onPhoneVerifyClick : onPhoneEditClick}
                    variant={editingPhone ? 'primary' : 'secondary_soft'}
                    className='rounded-full px-3 py-1 text-xs'
                  >
                    {editingPhone ? t('buttons.save') : t('buttons.edit')}
                  </Button>
                </div>
              }
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({ field }) => (
            <FloatingInput
              inputRef={emailInputRef}
              label='Email address'
              inputClassName={editingEmail ? '' : 'pointer-events-none'}
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
              rightAdornment={
                <div>
                  {!user?.email_verified && (
                    <Button
                      onClick={onEmailVerifyClick}
                      variant='secondary_soft'
                      className='mr-2 rounded-full px-3 py-1 text-xs'
                    >
                      {t('buttons.verify')}
                    </Button>
                  )}
                  <Button
                    disabled={editingEmail ? isSaveEmailDisabled : !user?.email_verified}
                    onClick={editingEmail ? onEmailVerifyClick : onEmailEditClick}
                    variant={editingEmail ? 'primary' : 'secondary_soft'}
                    className='rounded-full px-3 py-1 text-xs'
                  >
                    {editingEmail ? t('buttons.save') : t('buttons.edit')}
                  </Button>
                </div>
              }
            />
          )}
        />
      </div>
      {/* Phone verify flow modals with OTP code */}
      <PhoneVerifyModal
        phoneNumber={getValues('phone')}
        step={user?.phone_verified ? 'init' : 'step2'}
        open={isPhoneVerifyModalOpen}
        onClose={() => setIsPhoneVerifyModalOpen(false)}
      />
      {/* Email verify flow modals */}
      <EmailVerifyModal
        email={getValues('email')}
        step={user?.email_verified ? 'init' : 'step2'}
        open={isEmailVerifyModalOpen}
        onClose={() => setIsEmailVerifyModalOpen(false)}
      />
    </section>
  );
};
