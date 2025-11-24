'use client';
import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { CountrySelectModal } from '@/components/Account/Modal/CountrySelectModal';
import FloatingInput from '@/components/UI/FloatingInput';
import { CountryCode, fetchCountryCodes } from '@/lib/countryCodes';

export const AddressData = () => {
  const t = useTranslations();

  const [country, setCountry] = useState<CountryCode | null>(null);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countries, setCountries] = useState<CountryCode[]>([]);
  const [countryQuery, setCountryQuery] = useState('');

  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');

  const countryModalClose = () => {
    setCountryOpen(false);
    setCountryQuery('');
  };

  useEffect(() => {
    let mounted = true;
    fetchCountryCodes().then((list) => {
      if (!mounted) return;
      setCountries(list);
      const rs = list.find((c) => c.code === 'RS');
      setCountry(rs || list[0] || null);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredCountries = useMemo(() => {
    const q = countryQuery.trim().toLowerCase();
    if (!q) return countries;
    return countries
      .map((c) => {
        const name = c.name.toLowerCase();
        const code = c.code.toLowerCase();
        const dial = c.dial_code.toLowerCase();
        const qDigits = countryQuery.replace(/\D/g, '');
        const dialDigits = c.dial_code.replace(/\D/g, '');
        const scores: number[] = [];
        if (name === q) scores.push(100);
        if (name.startsWith(q)) scores.push(85);
        if (name.includes(q)) scores.push(65);
        if (code === q) scores.push(75);
        if (code.startsWith(q)) scores.push(55);
        if (dial === q) scores.push(90);
        if (dial.startsWith(q)) scores.push(75);
        if (qDigits) {
          if (dialDigits === qDigits) scores.push(95);
          if (dialDigits.startsWith(qDigits)) scores.push(85);
        }
        const score = scores.length ? Math.max(...scores) : -1;
        return { score, c };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.c);
  }, [countries, countryQuery]);

  return (
    <section>
      <div className='bg-dark-indigo rounded-2xl p-4 md:p-6'>
        <div className='mb-6'>
          <h2 className='text-lemon-yellow text-[20px] font-semibold'>Address</h2>
          <p className='text-lemon-yellow/50 text-sm'>To edit the locked fields, please contact support</p>
        </div>
        <div className='space-y-[18px]'>
          <div className='relative'>
            <button
              type='button'
              onClick={() => setCountryOpen(true)}
              className='border-lemon-yellow/40 bg-dark-indigo text-lemon-yellow hover:border-lemon-yellow/60 flex h-12 w-full items-center justify-between rounded-[8px] border px-4 text-sm transition-colors'
            >
              <span className='flex items-center gap-2'>
                {country?.flag ? (
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={28}
                    height={20}
                    className='rounded-sm object-cover'
                  />
                ) : (
                  <span className='bg-lemon-yellow/20 inline-block h-5 w-7 rounded-sm' />
                )}
                <span className='text-lemon-yellow text-sm'>{country?.name || 'Select country'}</span>
              </span>
            </button>
          </div>
          <FloatingInput label='City' value={city} onChange={(e) => setCity(e.target.value)} />
          <FloatingInput label='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
          <FloatingInput label='Postcode' value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </div>
      </div>

      <CountrySelectModal
        open={countryOpen}
        onClose={countryModalClose}
        selectedCode={country?.code}
        countries={filteredCountries}
        onSelect={setCountry}
        query={countryQuery}
        onQueryChange={setCountryQuery}
      />
    </section>
  );
};
