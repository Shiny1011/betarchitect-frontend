'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/shared';
import {
  CasinadeIcon,
  MasterCardLgIcon,
  NetellerLgIcon,
  PaySafeLgIcon,
  RevolutLgIcon,
  SkrillLgIcon,
  VisaCardLgIcon,
  InstagramIcon,
  LinkedinIcon,
  EmailInboxIcon,
  XIcon,
  DownArrowIcon,
} from '@/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    helpful: false,
    casino: false,
    sports: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const footerLinks = {
    helpful: [
      { name: 'Terms and Conditions', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Bonus Terms', href: '#' },
      { name: 'Sports Betting Rules', href: '#' },
      { name: 'AML Policy', href: '#' },
      { name: 'KYC Policy', href: '#' },
      { name: 'Responsible Gambling', href: '#' },
    ],
    casino: [
      { name: 'Live Casino', href: '#' },
      { name: 'Live Dealer', href: '#' },
      { name: 'Popular Games', href: '#' },
      { name: 'New Games', href: '#' },
      { name: 'Bonus Buys', href: '#' },
      { name: 'Slots', href: '#' },
      { name: 'Jackpots', href: '#' },
      { name: 'Table Games', href: '#' },
      { name: 'Providers', href: '#' },
    ],
    sports: [
      { name: 'Live Betting', href: '#' },
      { name: 'Pre-Match', href: '#' },
      { name: 'Popular Sports', href: '#' },
      { name: 'E-sports', href: '#' },
      { name: 'Football', href: '#' },
    ],
  };

  return (
    <footer className='bg-dark-indigo mt-8 rounded-t-xl max-md:mb-8 md:mt-16'>
      <div className='mx-auto max-w-7xl px-4 py-11 md:px-6 lg:px-8'>
        <div className='grid grid-cols-3 justify-items-center gap-4 md:flex md:justify-center md:gap-[64px]'>
          <div className='scale-75 md:scale-100'>
            <MasterCardLgIcon />
          </div>
          <div className='scale-75 md:scale-100'>
            <VisaCardLgIcon />
          </div>
          <div className='scale-75 md:scale-100'>
            <RevolutLgIcon />
          </div>
          <div className='scale-75 md:scale-100'>
            <PaySafeLgIcon />
          </div>
          <div className='scale-75 md:scale-100'>
            <SkrillLgIcon />
          </div>
          <div className='scale-75 md:scale-100'>
            <NetellerLgIcon />
          </div>
        </div>
        <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2'>
          <div className='w-full lg:col-span-1'>
            <div className='mb-4 flex items-center space-x-2 max-md:hidden'>
              <CasinadeIcon />
            </div>
            <div className='text-yellow-primary/70 mb-6 w-full text-xs md:text-sm'>
              Casinade.com is owned and operated by Bright Gaming Inc. (Reg. No. 3102918820, address, address, Saint
              Lucia, Saint Lucia. For inquiries, email support@casinade.com.
              <br />
              <br />
              The website is licensed by the Government of the Autonomous Island of Anjouan (Union of Comoros) under
              License No. ALSI-202411080-FI2 and is fully compliant to operate gaming and wagering services.
              <br />
              <br />
              Payments are processed by Allesgut Europe Ltd, Company No. НЕ469614, Avlonos, 1 Maria House, 1075,
              Nicosia, Cyprus.
            </div>
            <div className='mb-[9px] md:hidden'>
              <span className='text-lavander text-xs leading-none font-bold'>Follow us</span>
            </div>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                aria-label='X'
              >
                <XIcon size={16} />
              </a>
              <a
                href='#'
                className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                aria-label='Instagram'
              >
                <InstagramIcon />
              </a>
              <a
                href='#'
                className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                aria-label='Linkedin'
              >
                <LinkedinIcon />
              </a>
              <a
                href='#'
                className='bg-lavander/10 hover:bg-lavander/20 flex h-10 w-10 items-center justify-center rounded-full transition-colors'
                aria-label='Email'
              >
                <EmailInboxIcon size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Accordions */}
          <div className='space-y-4 md:hidden'>
            {/* Helpful Accordion */}
            <div className='bg-dark-indigo overflow-hidden rounded-lg'>
              <Button
                variant='ghost'
                className='flex w-full items-center justify-between rounded-none bg-[#182641] p-4 text-left'
                onClick={() => toggleAccordion('helpful')}
              >
                <h3 className='text-lemon-yellow font-semibold'>Helpful</h3>
                <DownArrowIcon
                  className={`transform transition-transform duration-200 ${openAccordions.helpful ? 'rotate-180' : ''}`}
                  size={16}
                  color='#E0FE08'
                />
              </Button>
              {openAccordions.helpful && (
                <div className='mb-2 rounded-b-lg bg-[#182641] px-4 pb-4'>
                  <ul className='space-y-3 pt-4'>
                    {footerLinks.helpful.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className='text-lemon-yellow/50 hover:text-lemon-yellow block text-sm transition-colors'
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Casino Accordion */}
            <div className='bg-dark-indigo overflow-hidden rounded-lg'>
              <Button
                variant='ghost'
                className='flex w-full items-center justify-between rounded-none bg-[#182641] p-4 text-left'
                onClick={() => toggleAccordion('casino')}
              >
                <h3 className='text-lemon-yellow font-semibold'>Casino</h3>
                <DownArrowIcon
                  className={`transform transition-transform duration-200 ${openAccordions.casino ? 'rotate-180' : ''}`}
                  size={16}
                  color='#E0FE08'
                />
              </Button>
              {openAccordions.casino && (
                <div className='mb-2 rounded-b-lg bg-[#182641] px-4 pb-4'>
                  <ul className='space-y-3 pt-4'>
                    {footerLinks.casino.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className='text-lemon-yellow/50 hover:text-lemon-yellow block text-sm transition-colors'
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sports Accordion */}
            <div className='bg-dark-indigo overflow-hidden rounded-lg'>
              <Button
                variant='ghost'
                className='flex w-full items-center justify-between rounded-none bg-[#182641] p-4 text-left'
                onClick={() => toggleAccordion('sports')}
              >
                <h3 className='text-lemon-yellow font-semibold'>Sports</h3>
                <DownArrowIcon
                  className={`transform transition-transform duration-200 ${openAccordions.sports ? 'rotate-180' : ''}`}
                  size={16}
                  color='#E0FE08'
                />
              </Button>
              {openAccordions.sports && (
                <div className='mb-2 rounded-b-lg bg-[#182641] px-4 pb-4'>
                  <ul className='space-y-3 pt-4'>
                    {footerLinks.sports.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className='text-lemon-yellow/50 hover:text-lemon-yellow block text-sm transition-colors'
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Links */}
          <div className='hidden gap-10 md:flex'>
            <div>
              <h3 className='text-lemon-yellow mb-4 font-semibold'>Helpful</h3>
              <ul className='space-y-3'>
                {footerLinks.helpful.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-lemon-yellow/50 hover:text-lemon-yellow text-sm transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lemon-yellow mb-4 font-semibold'>Casino</h3>
              <ul className='space-y-3'>
                {footerLinks.casino.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-lemon-yellow/50 hover:text-lemon-yellow text-sm transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-lemon-yellow mb-4 font-semibold'>Sports</h3>
              <ul className='space-y-3'>
                {footerLinks.sports.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-lemon-yellow/50 hover:text-lemon-yellow text-sm transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
