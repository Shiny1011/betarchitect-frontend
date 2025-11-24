import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { api } from '@/lib/api';
import { loadPage } from '@/lib/page-loader';
import { VipLevel } from '@/lib/schema';

import { VipPageClient } from './VipPageClient';

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

interface PageProps {
  params: Promise<{ locale: string }>;
}

async function getVipLevels(): Promise<VipLevel[]> {
  try {
    return await api<VipLevel[]>(`/vip/levels`, {
      method: 'GET',
      // credentials: 'include',
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  } catch (error) {
    console.error('Failed to fetch VIP levels:', error);
    return []; // Return empty array on error - templates never throw
  }
}

// Generate static params for all locales that have this page
export async function generateStaticParams() {
  // Import manifestReader here to avoid circular dependencies
  const { manifestReader } = await import('@/lib/manifest-reader');
  const localesForPage = manifestReader.getLocalesForSlug('vip');

  return localesForPage.map((locale) => ({ locale }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Use loadPage to get metadata with fallback logic
  const { pageContent } = (await loadPage('vip', locale)) || {};

  if (!pageContent) {
    return {
      title: 'VIP Program | Casinade',
      description: 'Exclusive VIP program with premium benefits',
    };
  }

  return {
    title: pageContent.meta.title,
    description: pageContent.meta.meta_description,
  };
}

export default async function VipPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale); // Enable static rendering for this locale

  // Prevent API calls during build time using official CI environment variable
  const vipLevels = process.env.CI ? [] : await getVipLevels();

  return <VipPageClient vipLevels={vipLevels} />;
}
