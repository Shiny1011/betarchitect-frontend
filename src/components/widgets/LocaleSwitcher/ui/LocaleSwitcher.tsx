'use client';

import { useTranslations } from 'next-intl';

import Accordion from '@/components/UI/Accordion';
import ConsentRadio from '@/components/UI/ConsentRadio';
import { MANIFEST_SUPPORTED_LOCALES, LANGUAGE } from '@/constants';
import { TranslateIcon } from '@/Icons';

import { useSwitchLanguage } from '../hooks/useLanguageSwitch';

export const LocaleSwitcher = () => {
  const t = useTranslations();
  const { selectedLanguage, onLanguageChange } = useSwitchLanguage();

  return (
    <Accordion
      arrowSize={12}
      className={{ root: 'p-0', titleBox: 'flex items-center' }}
      titleLeftIcon={({ isOpen }) => <TranslateIcon size={24} className='p-3' opacity={isOpen ? 1 : 0.5} />}
      title={
        <p className='text-sm font-medium'>
          {t('common.language.title')}: {selectedLanguage}
        </p>
      }
    >
      <div className='pl-10'>
        {MANIFEST_SUPPORTED_LOCALES?.map((locale) => {
          return (
            <ConsentRadio
              key={locale}
              className='hover:bg-lemon-yellow/10'
              id={locale}
              label={LANGUAGE[locale]}
              name={locale}
              checked={LANGUAGE[locale] === selectedLanguage}
              onChange={({ target: { name } }) => onLanguageChange(name)}
            />
          );
        })}
      </div>
    </Accordion>
  );
};
