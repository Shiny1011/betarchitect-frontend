'use client';

import React, { useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import AmountInput from '@/components/UI/AmountInput';
import FloatingInput from '@/components/UI/FloatingInput';
import {
  VisaCardSmIcon,
  RevolutSmIcon,
  PaySafeSmIcon,
  NetellerSmIcon,
  SkrillSmIcon,
  MasterCardSmIcon,
  CloseIcon,
  BitcoinCashIcon,
  EthereumIcon,
  TronIcon,
  DownArrowIcon,
} from '@/Icons';
import { IconProps, PaymentMethod } from '@/lib/schema';

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Tab = 'bank' | 'crypto';

export default function WithdrawModal({ open, onClose, onSuccess }: WithdrawModalProps) {
  const [tab, setTab] = useState<Tab>('bank');
  const [amount, setAmount] = useState('150');
  const quickAmounts = ['50', '100', '200', '250'];
  // Bank fields
  type BankMethod = 'visa' | 'revolut' | 'paysafe' | 'neteller' | 'skrill';
  const [bankMethod, setBankMethod] = useState<BankMethod>('revolut');
  const [iban, setIban] = useState('');
  const [bicSwift, setBicSwift] = useState('');
  const [beneficiary, setBeneficiary] = useState('');
  // Crypto fields
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencies = [
    { Icon: BitcoinCashIcon, name: 'BCH' },
    { Icon: EthereumIcon, name: 'ETH' },
    { Icon: TronIcon, name: 'TRN' },
  ];
  const [currency, setCurrency] = useState<{ Icon: React.FC<IconProps>; name: string }>(currencies[0]);
  const platformNames: Record<string, string> = {
    TRN: 'TRON',
    BCH: 'Bitcoin Cash',
    ETH: 'Ethereum',
  };
  const [address, setAddress] = useState('');
  // Demo balance for helper text
  const realBalance = 149;
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const currencyRef = useRef<HTMLDivElement>(null);

  const minAmount = 20;
  const maxAmount = 2000;
  const isEmpty = amount.trim() === '';
  const amt = Number(amount);
  const outOfRange = !isEmpty && (isNaN(amt) || amt < minAmount || amt > maxAmount);
  const cryptoBalanceExceeded = !isEmpty && !isNaN(amt) && amt > realBalance;
  const amountError = cryptoBalanceExceeded || outOfRange;

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!currencyOpen) return;
      const el = currencyRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [currencyOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    onSuccess?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className='relative max-h-[90vh] w-[488px] overflow-y-auto rounded-2xl border border-solid border-[#22355A] bg-[#13203D] p-5 pb-8 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex w-full justify-end'>
              <button
                onClick={onClose}
                className='text-lemon-yellow/80 hover:bg-lemon-yellow/10 hover:text-lemon-yellow -mt-2 -mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded p-1 transition-all duration-200'
              >
                <CloseIcon />
              </button>
            </div>

            <div className='flex items-center justify-center'>
              <h3 className='text-lemon-yellow text-[22px] font-semibold'>Withdraw</h3>
            </div>

            <div className='mt-[18px] flex items-center justify-center'>
              <button
                onClick={() => {
                  setTab('bank');
                  setAmount('');
                }}
                className={`h-[43px] w-[117px] rounded-l-lg text-lg font-medium ${
                  tab === 'bank' ? 'bg-lemon-yellow text-dark-indigo' : 'text-lemon-yellow/50 bg-[#22355A]'
                } flex cursor-pointer items-center justify-center`}
              >
                Bank
              </button>
              <button
                onClick={() => {
                  setTab('crypto');
                  setAmount('');
                }}
                className={`h-[43px] w-[117px] rounded-r-lg text-lg font-medium ${
                  tab === 'crypto' ? 'bg-lemon-yellow text-dark-indigo' : 'text-lemon-yellow/50 bg-[#22355A]'
                } flex cursor-pointer items-center justify-center`}
              >
                Crypto
              </button>
            </div>

            {tab === 'bank' && (
              <div className='mt-[18px] flex items-center gap-4'>
                <button
                  type='button'
                  onClick={() => setPaymentMethod('card')}
                  className={`flex h-[37px] w-[77px] items-center justify-center gap-1 rounded-xl border bg-[#142341] transition-colors hover:bg-[#162848] ${
                    paymentMethod === 'card'
                      ? 'border-lemon-yellow shadow-[0_0_0_2px_rgba(224,254,8,0.4)]'
                      : 'border-[#22355A]'
                  }`}
                  aria-label='Card (Visa/Mastercard)'
                >
                  <MasterCardSmIcon />
                  <VisaCardSmIcon />
                </button>
                <button
                  type='button'
                  onClick={() => setPaymentMethod('revolut')}
                  className={`flex h-[37px] w-[77px] items-center justify-center rounded-xl border bg-[#142341] transition-colors hover:bg-[#162848] ${
                    paymentMethod === 'revolut'
                      ? 'border-lemon-yellow shadow-[0_0_0_2px_rgba(224,254,8,0.4)]'
                      : 'border-[#22355A]'
                  }`}
                  aria-label='Revolut'
                >
                  <RevolutSmIcon />
                </button>
                <button
                  type='button'
                  onClick={() => setPaymentMethod('paysafe')}
                  className={`flex h-[37px] w-[77px] items-center justify-center rounded-xl border bg-[#142341] transition-colors hover:bg-[#162848] ${
                    paymentMethod === 'paysafe'
                      ? 'border-lemon-yellow shadow-[0_0_0_2px_rgba(224,254,8,0.4)]'
                      : 'border-[#22355A]'
                  }`}
                  aria-label='Paysafe'
                >
                  <PaySafeSmIcon color='#3200FF' />
                </button>
                <button
                  type='button'
                  onClick={() => setPaymentMethod('neteller')}
                  className={`flex h-[37px] w-[77px] items-center justify-center rounded-xl border bg-[#142341] transition-colors hover:bg-[#162848] ${
                    paymentMethod === 'neteller'
                      ? 'border-lemon-yellow shadow-[0_0_0_2px_rgba(224,254,8,0.4)]'
                      : 'border-[#22355A]'
                  }`}
                  aria-label='Neteller'
                >
                  <NetellerSmIcon />
                </button>
                <button
                  type='button'
                  onClick={() => setPaymentMethod('skrill')}
                  className={`flex h-[37px] w-[77px] items-center justify-center rounded-xl border bg-[#142341] transition-colors hover:bg-[#162848] ${
                    paymentMethod === 'skrill'
                      ? 'border-lemon-yellow shadow-[0_0_0_2px_rgba(224,254,8,0.4)]'
                      : 'border-[#22355A]'
                  }`}
                  aria-label='Skrill'
                >
                  <SkrillSmIcon />
                </button>
              </div>
            )}

            <form onSubmit={submit} className='mt-[18px] space-y-4'>
              {/* Amount with helper and validation */}
              <AmountInput
                label={`Amount (${minAmount}€ - ${maxAmount}€)`}
                type='tel'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={amountError}
                helperText={
                  cryptoBalanceExceeded ? `You have ${realBalance} € left in your real money balance.` : undefined
                }
              />

              {/* Quick amounts */}
              <div className='mt-[18px] flex w-full justify-between gap-2'>
                {quickAmounts.map((a) => (
                  <button
                    key={a}
                    type='button'
                    onClick={() => setAmount(a)}
                    className='text-lavander/50 hover:bg-lavander/10 border-lavander/50 bg-dark-indigo w-[90px] rounded-full border px-4 py-2'
                  >
                    {a}€
                  </button>
                ))}
              </div>

              {tab === 'bank' ? (
                <>
                  {/* Bank details */}
                  <div className='mt-[32px] space-y-[14px]'>
                    <FloatingInput label='IBAN' type='text' value={iban} onChange={(e) => setIban(e.target.value)} />
                    <FloatingInput
                      label='BIC / SWIFT'
                      type='text'
                      value={bicSwift}
                      onChange={(e) => setBicSwift(e.target.value)}
                    />
                    <FloatingInput
                      label='Beneficiary name'
                      type='text'
                      value={beneficiary}
                      onChange={(e) => setBeneficiary(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Currency select + platform */}
                  <div className='mt-1 grid grid-cols-2 gap-3'>
                    {/* Currency pseudo-select with CSS transitions */}
                    <div ref={currencyRef} className='relative'>
                      <button
                        type='button'
                        onClick={() => setCurrencyOpen((s) => !s)}
                        className={`text-lemon-yellow/80 border-lemon-yellow bg-blue-indigo flex h-12 w-full ${
                          currencyOpen ? 'rounded-b-none border-b-transparent' : ''
                        } items-center justify-between rounded-[8px] border px-3 text-sm transition-all duration-200`}
                        aria-expanded={currencyOpen}
                      >
                        <div className='flex flex-col justify-start'>
                          <div className='text-lemon-yellow/50 leading-full mr-2 text-xs'>Currency</div>
                          <div className='flex items-center gap-2'>
                            <currency.Icon size={16} />
                            <div className='text-lemon-yellow text-start font-medium'>{currency.name}</div>
                          </div>
                        </div>
                        <span className={`text-lemon-yellow/50 ${currencyOpen ? 'rotate-180' : ''} transition-all`}>
                          <DownArrowIcon />
                        </span>
                      </button>

                      <div
                        className={`border-lemon-yellow bg-blue-indigo absolute z-50 w-full overflow-hidden rounded-md rounded-t-none border border-t-0 transition-all duration-300 ${
                          currencyOpen
                            ? 'pointer-events-auto max-h-[220px] opacity-100'
                            : 'pointer-events-none max-h-0 opacity-0'
                        }`}
                      >
                        {currencies.map((c) => (
                          <button
                            key={c.name}
                            type='button'
                            onClick={() => {
                              setCurrency(c);
                              setCurrencyOpen(false);
                            }}
                            className={`text-lemon-yellow/80 flex w-full px-3 py-3 text-left text-sm`}
                          >
                            <c.Icon />
                            <div className='ml-2'>{c.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <FloatingInput
                      label='Platform'
                      type='text'
                      value={platformNames[currency.name]}
                      onChange={() => {}}
                      readOnly
                      disabled
                      className='rounded-md'
                      containerBgClass='bg-[#22355A]'
                      colorVariant='lavender'
                      inputClassName='cursor-default text-[16px] font-medium !text-lavander'
                    />
                  </div>

                  {/* Crypto address */}
                  <FloatingInput
                    label='Crypto address'
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </>
              )}

              <button
                type='submit'
                className='bg-lemon-yellow hover:bg-lemon-yellow/90 text-dark-indigo w-full rounded-md py-3 font-semibold'
              >
                Withdraw
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
