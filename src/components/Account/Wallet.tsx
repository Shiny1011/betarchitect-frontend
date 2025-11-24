'use client';

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useWalletMutation, useWalletQuery } from '@/components/features';
import { CurrencyType, WalletType } from '@/constants';
import { PlusIcon } from '@/Icons';
import { CurrencyCode, isCurrencyCode, getCurrencySymbol } from '@/lib/currency';

import DepositModal from '../Finance/DepositModal';
import NewCurrencyModal from '../Finance/NewCurrencyModal';
import WithdrawModal from '../Finance/WithdrawModal';
import WithdrawSuccessModal from '../Finance/WithdrawSuccessModal';

export default function Wallet() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawSuccessOpen, setIsWithdrawSuccessOpen] = useState(false);
  const [isNewCurrencyOpen, setIsNewCurrencyOpen] = useState(false);

  const { mutate: createBalance, isLoading } = useWalletMutation();
  const { data: walletData, isLoading: isWalletLoading, error: walletError } = useWalletQuery();

  const t = useTranslations();

  function addCurrency(currencyCode: CurrencyCode) {
    createBalance(
      { currency_code: String(currencyCode), type: CurrencyType.MAIN, amount: 0 },
      {
        onSuccess: () => {
          setIsNewCurrencyOpen(false);
        },
        onError: (error) => {
          console.error('Error adding currency:', error);
          // todo inform user
        },
      }
    );
  }

  if (isWalletLoading) {
    return (
      <div className='text-lemon-yellow p-10 text-center'>
        <p>{t('page.account.text.walletLoading')}</p>
      </div>
    );
  }

  if (walletError) {
    return <div className='p-10 text-center text-red-500'>{t('common.notification.walletLoadError')}</div>;
  }

  return (
    <div className='relative'>
      <div className='grid gap-4 md:grid-cols-1 lg:grid-cols-2'>
        {walletData &&
          walletData.map((w) => (
            <div key={w.id} className='bg-dark-indigo relative rounded-2xl p-5'>
              <div className='flex w-full justify-end'>
                <span
                  className={`rounded-full border font-medium ${
                    w.type === WalletType.FIAT
                      ? 'border-lavander text-lavander'
                      : 'border-lemon-yellow text-lemon-yellow'
                  } px-3 py-1 text-xs`}
                >
                  {w.type === WalletType.FIAT
                    ? t('page.account.title.currencyTypeFiat')
                    : t('page.account.title.currencyTypeCrypto')}
                </span>
              </div>

              <div className='text-lavander text-[20px] font-medium'>{w.currency_code}</div>

              <div className='border-lemon-yellow mt-[9px] space-y-1 border-l-[3px] border-solid pl-3'>
                <div className='text-lemon-yellow/50 text-[14px] leading-[18px]'>
                  {t('page.account.title.totalBalance')}
                </div>
                <div className='text-lavander text-[22px] leading-[28px] font-bold'>
                  {w.amount}{' '}
                  {isCurrencyCode(w.currency_code)
                    ? getCurrencySymbol(w.currency_code as CurrencyCode)
                    : w.currency_code}
                </div>
              </div>

              <div className='mt-4 flex items-center gap-3'>
                <button
                  onClick={() => setIsWithdrawOpen(true)}
                  className='text-blue-indigo bg-lavander leading-full rounded-full border px-[22px] py-2.5 text-sm font-medium'
                >
                  {t('buttons.withdraw')}
                </button>
                <button
                  onClick={() => setIsDepositOpen(true)}
                  className='text-blue-indigo bg-lemon-yellow leading-full rounded-full border px-[22px] py-2.5 text-sm font-medium'
                >
                  {t('buttons.deposit')}
                </button>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => setIsNewCurrencyOpen(true)}
        className='border-lemon-yellow bg-blue-indigo fixed right-[54px] bottom-[17px] flex cursor-pointer items-center gap-2 rounded-full border border-solid px-5 py-2.5 transition-all duration-200 active:scale-95'
      >
        <PlusIcon size={14} />
        {t('page.account.title.newCurrencyBtn')}
      </button>

      <DepositModal
        open={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onSuccess={() => setIsDepositOpen(false)}
      />
      <WithdrawModal
        open={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onSuccess={() => {
          setIsWithdrawOpen(false);
          setIsWithdrawSuccessOpen(true);
        }}
      />
      <WithdrawSuccessModal open={isWithdrawSuccessOpen} onClose={() => setIsWithdrawSuccessOpen(false)} />
      <NewCurrencyModal open={isNewCurrencyOpen} onClose={() => setIsNewCurrencyOpen(false)} onAdd={addCurrency} />
      {/* Loading indicator */}
      {isLoading && (
        <div className='bg-dark-indigo/80 text-lemon-yellow fixed inset-0 z-[101] grid place-items-center text-xl'>
          {t('page.account.text.addingCurrency')}
        </div>
      )}
    </div>
  );
}
