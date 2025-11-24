'use client';

import { useMemo, useState } from 'react';

import PromotionDetailsModal, { PromotionDetailsContent } from '@/components/Promotions/PromotionDetailsModal';
import { Promotion, Tab } from '@/lib/schema';

const mockPromotions: Promotion[] = [
  {
    id: '1',
    title: 'Golden Ticket',
    subtitle: '200 FS and 1000$',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/promotions/promotions.png',
    category: 'casino',
  },
  {
    id: '2',
    title: 'Golden Ticket',
    subtitle: 'Prize Example Description',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/promotions/promotions.png',
    category: 'casino',
  },
  {
    id: '3',
    title: 'Golden Ticket',
    subtitle: 'Prize Example Description',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/promotions/promotions.png',
    category: 'sport',
  },
  {
    id: '4',
    title: 'Golden Ticket',
    subtitle: 'Prize Example Description',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/promotions/promotions.png',
    category: 'community',
  },

  ...Array.from({ length: 8 }).map((_, i) => ({
    id: String(5 + i),
    title: 'Golden Ticket',
    subtitle: 'Prize Example Description',
    imageUrl: 'https://ahkxmpeatcgrqgeihrnx.supabase.co/storage/v1/object/public/assets/promotions/promotions.png',
    category: (i % 3 === 0 ? 'casino' : i % 3 === 1 ? 'sport' : 'community') as Promotion['category'],
  })),
];

function PromotionCard({ promotion, onDetails }: { promotion: Promotion; onDetails: (p: Promotion) => void }) {
  return (
    <div className='bg-dark-indigo relative rounded-[16px]'>
      {promotion.imageUrl ? (
        <div className='flex overflow-hidden rounded-lg'>
          <div className='w-[94px] bg-transparent'></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={promotion.imageUrl} alt={promotion.title} className='h-[254px] w-full object-cover' />
        </div>
      ) : (
        <div className='bg-blue-indigo/20 mb-4 h-[160px] w-full rounded-lg' />
      )}
      <div className='absolute bottom-6 left-6'>
        <div className='text-lavander mb-1 text-[14px] font-medium'>Lottery</div>
        <div className='text-lemon-yellow mb-0.5 text-[18px] font-medium'>{promotion.title}</div>
        <div className='text-lemon-yellow text-xs font-light'>{promotion.subtitle}</div>
        <button
          onClick={() => onDetails(promotion)}
          className='bg-lavander text-blue-indigo mt-[18px] w-[145px] rounded-[4px] px-4 py-2 text-sm font-semibold'
        >
          DETAILS
        </button>
      </div>
    </div>
  );
}

export function PromotionsPageClient({ promotions }: { promotions: Promotion[] }) {
  const [tab, setTab] = useState<Tab>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<PromotionDetailsContent | null>(null);

  const filtered = useMemo(() => {
    if (tab === 'all') return mockPromotions;
    return mockPromotions.filter((p) => p.category === tab);
  }, [tab]);

  const tabs: { key: Tab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'casino', label: 'Casino' },
    { key: 'sport', label: 'Sport' },
    { key: 'community', label: 'Community' },
  ];

  return (
    <div>
      <h1 className='text-lemon-yellow mb-[18px] text-[22px] font-bold'>Promotions</h1>

      {/* Segmented filters */}
      <div className='bg-dark-indigo inline-flex items-center gap-2 rounded-[12px] p-[10px]'>
        {tabs.map(({ key, label }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`h-[35px] w-[100px] rounded-[10px] text-center text-xs font-semibold transition-colors ${
                active ? 'bg-lemon-yellow text-blue-indigo' : 'text-lemon-yellow/50 hover:bg-dark-indigo/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className='mt-[24px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {filtered.map((item, idx) => (
          <PromotionCard
            key={idx}
            promotion={item}
            onDetails={(p) => {
              setModalContent({
                title: p.title,
                heroImageUrl: p.imageUrl,
                descriptionLead:
                  'Dreaming of a big win? Take part in our Golden Ticket Lottery and get your chance to unlock exclusive prizes!',
                bullets: [
                  {
                    section: 'How it Works:',
                    items: [
                      'Every deposit of $20 or more earns you 1 Golden Ticket.',
                      'The more tickets you collect — the higher your chances of winning.',
                      'All tickets automatically enter the weekly prize draw.',
                    ],
                  },
                  {
                    section: 'Prizes:',
                    items: [
                      'Cash rewards with no wagering requirements.',
                      'Free Spins on top casino games.',
                      'Special bonuses and surprises for lucky winners.',
                    ],
                  },
                  {
                    section: 'How to join:',
                    items: [
                      'Register or log in to your Coins.Game account.',
                      'Make a qualifying deposit and receive your Golden Ticket.',
                      'Follow the draw results on the Lottery page',
                    ],
                  },
                  {
                    section: 'Timing:',
                    items: [
                      <>
                        The Golden Ticket Lottery takes place <span className='text-lavander'>every week</span>. Winners
                        are selected automatically and prizes are credited instantly.
                      </>,
                    ],
                  },
                ],
                ctaText: 'Claim Now',
              });
              setModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Details Modal */}
      {modalContent && (
        <PromotionDetailsModal open={modalOpen} onClose={() => setModalOpen(false)} content={modalContent} />
      )}
    </div>
  );
}
