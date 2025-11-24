'use client';

import { useEffect, useMemo, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { Button, ErrorFormMessage, SearchBar } from '@/components/shared';
import CountryCodeSelect from '@/components/UI/CountryCodeSelect';
import DateTextInput from '@/components/UI/DateTextInput';
import FloatingInput from '@/components/UI/FloatingInput';
import { DEFAULT_PREFIX } from '@/constants';
import { fetchCountry } from '@/lib/api';
import { fetchCountryCodes } from '@/lib/countryCodes';
import { getLocation } from '@/lib/geolocation';
import { ICountry } from '@/lib/schema';
import { convertDate } from '@/lib/utils';
import { birthdayValidation } from '@/lib/validation';

import { useSignupDetails } from '../hooks/useSignupDetails';

interface SignupDetailsFormProps {
  onSuccess?: VoidFunction;
}

const signupDetailsSchema = z.object({
  username: z.string().nonempty('Username is required'),
  first_name: z.string().nonempty('First name is required'),
  last_name: z.string().nonempty('Last name is required'),
  country: z.string().nonempty('Country is required'),
  birthday: birthdayValidation,
  phone_code: z.string().optional(),
  phone_number: z.string().optional(),
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  city: z.string().optional(),
  postal_code: z.string().optional(),
  country_id: z.string().optional(),
});

type SignupDetailsFormData = z.infer<typeof signupDetailsSchema>;

export const SignupDetailsForm = ({ onSuccess }: SignupDetailsFormProps) => {
  const t = useTranslations();
  const { mutateAsync: signup, isError } = useSignupDetails();

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countriesData, setCountriesData] = useState<ICountry[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<SignupDetailsFormData>({
    resolver: zodResolver(signupDetailsSchema),
    defaultValues: {
      username: '',
      first_name: '',
      last_name: '',
      birthday: '',
      phone_code: DEFAULT_PREFIX,
      phone_number: '',
      country: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  useEffect(() => {
    const fetchLocation = async (): Promise<void> => {
      try {
        const loc = await getLocation();

        if (loc?.country_name) {
          setValue('country', loc.country_name);
          setSelectedCountry(loc.country_name);

          const countryCodes = await fetchCountryCodes();
          const matchedCountry = countryCodes.find(
            ({ name }) => name.toLowerCase() === loc.country_name?.toLowerCase()
          );

          if (matchedCountry?.dial_code) {
            setValue('phone_code', matchedCountry.dial_code);
          }
        }
      } catch (error) {
        console.error('Failed to get location:', error);
      }
    };

    fetchLocation();
  }, []);

  const handleSearch = async (value: string) => {
    setValue('country', value, { shouldValidate: false, shouldDirty: true });

    if (!value.trim()) {
      setCountriesData([]);
      return;
    }

    setCountriesLoading(true);
    try {
      const data = await fetchCountry(value, 10, 0);
      setCountriesData(data.countries);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      setCountriesData([]);
    } finally {
      setCountriesLoading(false);
    }
  };

  const countryOptions = useMemo(
    () => countriesData.map(({ name, id }) => ({ id, label: name, value: name })),
    [countriesData]
  );

  const handleSignupDetailsFormSubmit = async (formData: SignupDetailsFormData) => {
    const date = convertDate(formData.birthday);

    const payload = {
      ...formData,
      birthday: date,
      phone_code: formData.phone_code!,
    };

    await signup(payload);
    onSuccess?.();
  };

  const isDisabled = isSubmitting || !isDirty || !isValid;

  return (
    <form onSubmit={handleSubmit(handleSignupDetailsFormSubmit)} className='mt-8'>
      <div className='space-y-6'>
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <FloatingInput
              label={t('auth.signup.nickname')}
              {...field}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name='first_name'
          control={control}
          render={({ field }) => (
            <FloatingInput
              label={t('auth.signup.firstName')}
              {...field}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          )}
        />
        <Controller
          name='last_name'
          control={control}
          render={({ field }) => (
            <FloatingInput
              label={t('auth.signup.lastName')}
              {...field}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          )}
        />
        <Controller
          name='birthday'
          control={control}
          render={({ field }) => (
            <div>
              <DateTextInput {...field} />
              {errors.birthday && <p className='mt-1 text-xs text-red-500'>{errors.birthday.message}</p>}
            </div>
          )}
        />
        <Controller
          name='country'
          control={control}
          render={({ field }) => (
            <SearchBar
              {...field}
              label={t('auth.signup.country')}
              onSearch={handleSearch}
              results={countryOptions}
              onSelect={(country) => {
                field.onChange(country.value);
                setSelectedCountry(country.value);
                clearErrors('country');
              }}
              onBlur={() => {
                field.onBlur();

                if (field.value && field.value !== selectedCountry) {
                  setError(
                    'country',
                    {
                      type: 'manual',
                      message: 'Please select a country from the list',
                    },
                    { shouldFocus: false }
                  );
                }
              }}
              error={!!errors.country}
              helperText={errors.country?.message}
              isLoading={countriesLoading}
              debounceMs={1000}
              noResultsText={t('common.noResults.noCountryFound')}
              className='w-full'
            />
          )}
        />
      </div>
      <div className='mt-6 mb-8 flex gap-3'>
        <Controller
          name='phone_code'
          control={control}
          render={({ field }) => (
            <CountryCodeSelect className='w-46' value={field.value} onChange={(dial) => field.onChange(dial)} />
          )}
        />
        <Controller
          name='phone_number'
          control={control}
          render={({ field }) => (
            <FloatingInput
              className='w-full'
              label={t('auth.signup.phoneNumber')}
              {...field}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
          )}
        />
      </div>
      {isError && <ErrorFormMessage className='mb-4' message={t('auth.signup.errorMessage')} />}
      <Button type='submit' className='h-12 w-full' disabled={isDisabled}>
        {t('auth.signup.create')}
      </Button>
    </form>
  );
};
