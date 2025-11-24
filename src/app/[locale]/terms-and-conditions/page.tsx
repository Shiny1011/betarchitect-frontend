import { notFound, redirect } from 'next/navigation';

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { CanonicalLocale, MANIFEST_SUPPORTED_LOCALES } from '@/constants';
import { loadPage } from '@/lib/page-loader';

interface PageProps {
  params: Promise<{ locale: string }>;
}

// Generate static params for all locales that have this page
export async function generateStaticParams() {
  // Import manifestReader here to avoid circular dependencies
  const { manifestReader } = await import('@/lib/manifest-reader');
  const localesForPage = manifestReader.getLocalesForSlug('terms-and-conditions');

  return localesForPage.map((locale) => ({ locale }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Use loadPage to get metadata with fallback logic
  const { pageContent } = (await loadPage('terms-and-conditions', locale)) || {};

  if (!pageContent) {
    return {
      title: 'Terms and Conditions | Casinade',
      description: 'Terms and conditions for using our platform',
    };
  }

  return {
    title: pageContent.meta.title,
    description: pageContent.meta.meta_description,
  };
}

export default async function TermsAndConditionsPage({ params }: PageProps) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Validate locale
  if (!MANIFEST_SUPPORTED_LOCALES.includes(locale as CanonicalLocale)) {
    notFound();
  }

  // Load page with fallback logic
  const result = await loadPage('terms-and-conditions', locale);

  if (!result) {
    // Page doesn't exist at all - return 404
    notFound();
  }

  const { pageContent, shouldRedirect, redirectLocale } = result;

  if (shouldRedirect && redirectLocale) {
    // Page exists but not for requested locale - redirect to default locale
    redirect(`/${redirectLocale}/terms-and-conditions`);
  }

  const { meta, sanitizedHtml } = pageContent;

  return (
    <div className='container mx-auto px-4 py-8'>
      <header className='mb-8'>
        <h1 className='mb-4 text-4xl font-bold'>{meta.title}</h1>
        {meta.meta_description && <p className='text-lg text-gray-600 dark:text-gray-300'>{meta.meta_description}</p>}
      </header>

      <main className='prose prose-lg dark:prose-invert max-w-none'>
        {/* Render sanitized markdown content - safe from XSS */}
        <div className='markdown-content' dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </main>
    </div>
  );
}
