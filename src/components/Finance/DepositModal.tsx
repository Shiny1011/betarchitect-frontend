import React, { useEffect, useRef, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import PromoDropdownBanner from '@/components/Finance/PromoDropdownBanner';
import FloatingInput from '@/components/UI/FloatingInput';
import {
  MasterCardSmIcon,
  VisaCardSmIcon,
  RevolutSmIcon,
  PaySafeSmIcon,
  NetellerSmIcon,
  SkrillSmIcon,
  BTCQRCodeIcon,
  EthereumIcon,
  TronIcon,
  BitcoinCashIcon,
} from '@/Icons';
import { LeftArrowIcon } from '@/Icons';
import { fetchCountryCodes, type CountryCode } from '@/lib/countryCodes';
import { PaymentMethod, IconProps } from '@/lib/schema';

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Tab = 'bank' | 'crypto';

export default function DepositModal({ open, onClose, onSuccess }: DepositModalProps) {
  const [tab, setTab] = useState<Tab>('bank');
  const [amount, setAmount] = useState('150');
  const quickAmounts = ['50', '100', '200', '250'];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [billingOpen, setBillingOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countries, setCountries] = useState<CountryCode[]>([]);
  const [country, setCountry] = useState<CountryCode | null>(null);
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  // Promo dropdown state
  const [promoOpen, setPromoOpen] = useState(false);
  const promos = ['Get 100% up to 100.00 €', '100% Risk-Free Bet up to €100', '€50 Free Bet + 50 Free Spins'];
  const [selectedPromo, setSelectedPromo] = useState<string>(promos[0]);
  // Crypto currency dropdown state (CSS-only transitions)
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);
  // const currencies = ['BCH', 'ETH', 'TRN'];
  const currencies = [
    { Icon: BitcoinCashIcon, name: 'BCH' },
    { Icon: EthereumIcon, name: 'ETH' },
    { Icon: TronIcon, name: 'TRN' },
  ];
  const [currency, setCurrency] = useState<{ Icon: React.FC<IconProps>; name: string }>(currencies[0]);
  const platformNames: Record<string, string> = {
    BCH: 'Bitcoin Cash',
    ETH: 'Ethereum',
    TRN: 'TRON',
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

  // Close currency dropdown when clicking outside of its container
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
            className='relative max-h-[93vh] w-[488px] overflow-y-auto rounded-2xl border border-solid border-[#22355A] bg-[#13203D] p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-center'>
              <h3 className='text-lemon-yellow text-[22px] font-semibold'>Deposit</h3>
            </div>

            <button
              onClick={onClose}
              className='text-lemon-yellow/80 hover:bg-lemon-yellow/10 hover:text-lemon-yellow absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded p-1 transition-all duration-200'
            >
              ✕
            </button>

            <div className='mt-[18px] flex items-center justify-center'>
              <button
                onClick={() => {
                  setTab('bank');
                  setPromoOpen(false);
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
                  setPromoOpen(false);
                }}
                className={`h-[43px] w-[117px] rounded-r-lg text-lg font-medium ${
                  tab === 'crypto' ? 'bg-lemon-yellow text-dark-indigo' : 'text-lemon-yellow/50 bg-[#22355A]'
                } flex cursor-pointer items-center justify-center`}
              >
                Crypto
              </button>
            </div>

            {tab === 'bank' ? (
              <div className=''>
                {/* Payment method icons */}
                <div className='mt-[14px] flex items-center gap-4'>
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
                <form onSubmit={submit} className='mt-6'>
                  <div>
                    <label className='text-lemon-yellow/50 text-xs'>Amount (20€ - 2,000€)</label>
                    <input
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className='text-lemon-yellow focus:border-lemon-yellow mt-3 w-full rounded-md border border-[#22355A] bg-[#0F1B33] p-3 outline-none'
                    />
                  </div>
                  <div className='mt-2 text-[14px] font-medium'>
                    <span className='text-lemon-yellow/50'>You will receive </span>
                    <span className='text-lemon-yellow'>Welcome Bonus 150.50€ </span>
                    <span className='text-lemon-yellow/50'>and </span>
                    <span className='text-lemon-yellow'>200 Free Spins</span>
                  </div>
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

                  {/* Promo dropdown banner */}
                  <PromoDropdownBanner
                    className='mt-8'
                    open={promoOpen}
                    onToggle={() => setPromoOpen((o) => !o)}
                    selectedPromo={selectedPromo}
                    promos={promos}
                    onSelect={(p) => setSelectedPromo(p)}
                  />

                  <div className='mt-8 flex flex-col gap-[14px]'>
                    <FloatingInput
                      label='Card number'
                      type='tel'
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <div className='grid grid-cols-2 gap-3'>
                      <FloatingInput
                        label='MM/YY'
                        type='text'
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                      <FloatingInput label='CVC/CVV' type='tel' value={cvc} onChange={(e) => setCvc(e.target.value)} />
                    </div>
                    <FloatingInput
                      label='Cardholder name'
                      type='text'
                      value={cardholder}
                      onChange={(e) => setCardholder(e.target.value)}
                    />
                    {/* Required for card payments */}
                    <div className='mt-[10px]'>
                      <div
                        className='text-lemon-yellow/80 mb-1 flex cursor-pointer items-center justify-start gap-8 text-sm'
                        onClick={() => setBillingOpen((o) => !o)}
                      >
                        <span>Required for card payments</span>
                        <button
                          type='button'
                          className='text-lemon-yellow/70 hover:text-lemon-yellow grid h-6 w-6 place-items-center rounded-full border border-[#22355A] bg-[#0F1B33]'
                          aria-label='Toggle billing details'
                        >
                          <LeftArrowIcon
                            className={`${billingOpen ? 'rotate-90' : '-rotate-90'} transition-all duration-300`}
                            size={8}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {billingOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className='mt-4 space-y-4'>
                              {/* Country field */}
                              <div className='relative'>
                                <button
                                  type='button'
                                  onClick={() => setCountryOpen((o) => !o)}
                                  className={`bg-dark-indigo text-lemon-yellow hover:border-lemon-yellow/60 border-lemon-yellow/40 flex h-12 w-full items-center justify-between rounded-[8px] border px-4 text-sm transition-colors`}
                                >
                                  <span className='flex items-center gap-2'>
                                    {country?.flag ? (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img
                                        src={country.flag}
                                        alt={country.name}
                                        className='h-5 w-7 rounded-sm object-cover'
                                      />
                                    ) : (
                                      <span className='bg-lemon-yellow/20 inline-block h-5 w-7 rounded-sm' />
                                    )}
                                    <span className='text-lemon-yellow'>{country?.name || 'Select country'}</span>
                                  </span>
                                  <span className='flex items-center gap-2'>
                                    {/* Inline lock icon */}
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='16'
                                      height='16'
                                      viewBox='0 0 24 24'
                                      fill='none'
                                    >
                                      <path
                                        d='M7 10V8a5 5 0 0110 0v2'
                                        stroke='#768915'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                      />
                                      <rect
                                        x='5'
                                        y='10'
                                        width='14'
                                        height='10'
                                        rx='2'
                                        stroke='#768915'
                                        strokeWidth='2'
                                      />
                                      <circle cx='12' cy='15' r='2' fill='#768915' />
                                    </svg>
                                    <span className='text-lemon-yellow/70'>{countryOpen ? '▴' : '▾'}</span>
                                  </span>
                                </button>

                                {countryOpen && (
                                  <div className='bg-blue-indigo absolute z-50 mt-2 w-full rounded-[10px] border border-[#22355A] p-2 shadow-xl'>
                                    <div className='max-h-[240px] overflow-auto'>
                                      {countries.map((c, index) => (
                                        <button
                                          type='button'
                                          key={index}
                                          onClick={() => {
                                            setCountry(c);
                                            setCountryOpen(false);
                                          }}
                                          className='text-lemon-yellow hover:bg-lemon-yellow/10 flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm'
                                        >
                                          {c.flag ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                              src={c.flag}
                                              alt={c.name}
                                              className='h-4 w-6 rounded-sm object-cover'
                                            />
                                          ) : (
                                            <span className='bg-lemon-yellow/20 inline-block h-4 w-6 rounded-sm' />
                                          )}
                                          <span className='flex-1'>{c.name}</span>
                                          <span className='text-lemon-yellow/60 text-xs'>{c.code}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <FloatingInput
                                label='City'
                                type='text'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                              <FloatingInput
                                label='Address'
                                type='text'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                              <FloatingInput
                                label='Postcode'
                                type='text'
                                value={postcode}
                                onChange={(e) => setPostcode(e.target.value)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='bg-lemon-yellow text-dark-indigo mt-8 w-full rounded-md py-3 font-semibold'
                  >
                    Deposit
                  </button>
                </form>
              </div>
            ) : (
              <form onSubmit={submit} className='mt-9'>
                <div className='text-lemon-yellow/80 flex items-center justify-between text-xs'>
                  <span>1 BCH ≈ 428.72 €</span>
                  <span>Min deposit is 0.0046 BCH</span>
                </div>
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
                        ▾
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
                <div className='mt-1 text-[14px] font-medium'>
                  <span className='text-lemon-yellow/50'>You will receive </span>
                  <span className='text-lemon-yellow'>Welcome Bonus 150.50€ </span>
                  <span className='text-lemon-yellow/50'>and </span>
                  <span className='text-lemon-yellow'>200 Free Spins</span>
                </div>

                {/* Promo dropdown banner */}
                <PromoDropdownBanner
                  className='mt-9'
                  open={promoOpen}
                  onToggle={() => setPromoOpen((o) => !o)}
                  selectedPromo={selectedPromo}
                  promos={promos}
                  onSelect={(p) => setSelectedPromo(p)}
                />

                <div className='mt-[12px] flex w-full flex-col items-center justify-center rounded-md'>
                  {/* <div className='mx-auto h-44 w-44 bg-white' /> */}
                  <div className='w-fit rounded-[6px] bg-[#22355A] p-[14px]'>
                    <BTCQRCodeIcon />
                  </div>
                  <p className='text-lemon-yellow mt-[14px] text-[18px] font-semibold'>Your BCH deposit</p>
                </div>
                <div className='mt-6 flex w-full flex-col items-start gap-2 rounded-lg bg-[#22355A] p-2.5'>
                  <div className='leading-full text-xs font-medium'>Wallet Address</div>

                  <div className='flex w-full items-center justify-between'>
                    <div className='text-lemon-yellow/50 w-4/5 rounded-md text-base font-light break-words'>
                      bitcoincash:qpr3t5k8pc8kpe3y73uwgmkuhgz7sv4q9lcdc
                    </div>
                    <button
                      type='button'
                      className='text-blue-indigo bg-lavander jsutify-center flex h-fit items-center rounded-full px-4 py-2 text-[14px] font-medium'
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <button
                  type='submit'
                  className='bg-lemon-yellow text-dark-indigo mt-6 w-full rounded-md py-3 font-semibold'
                >
                  Deposit
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
