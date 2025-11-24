import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { api } from '@/lib/api';
import { loadPage } from '@/lib/page-loader';
import { Promotion } from '@/lib/schema';

import { PromotionsPageClient } from './PromotionsPageClient';

// ISR: Revalidate every 2 minutes
export const revalidate = 120;

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function getBonusPromos(): Promise<Promotion[]> {
  try {
    return await api<Promotion[]>(`/rules`, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Failed to fetch bonus promotions:', error);
    return [];
  }
}

// Generate static params for all locales that have this page
export async function generateStaticParams() {
  // Import manifestReader here to avoid circular dependencies
  const { manifestReader } = await import('@/lib/manifest-reader');

  const localesForPage = manifestReader.getLocalesForSlug('bonuses');
  return localesForPage.map((locale) => ({ locale }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { pageContent } = (await loadPage('bonuses', locale)) || {};

  if (!pageContent) {
    return {
      title: 'Promotions | Casinade',
      description: 'Exclusive promotions with premium benefits',
    };
  }

  return {
    title: pageContent.meta.title,
    description: pageContent.meta.meta_description,
  };
}

export default async function PromotionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Enable static rendering for this locale

  // Prevent API calls during build time using official CI environment variable
  const promotions = process.env.CI ? [] : await getBonusPromos();

  return <PromotionsPageClient promotions={promotions} />;
}
