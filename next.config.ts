import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { validateContentForBuild } from './scripts/validate-content.mjs';

// Validate content during build
if (process.env.NEXT_NODE_ENV === 'production' || process.env.NEXT_VALIDATE_CONTENT === 'true') {
  console.log('🔍 Validating content before build...');
  try {
    validateContentForBuild();
  } catch (error) {
    console.error('Build failed due to content validation errors');
    process.exit(1);
  }
}

const nextConfig: NextConfig = {
  images: {
    domains: ['ahkxmpeatcgrqgeihrnx.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahkxmpeatcgrqgeihrnx.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async headers() {
    if (process.env.NEXT_NODE_ENV === 'dev') {
      return [];
    }

    return [
      // Static assets Next.js (long caching)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year
          },
        ],
      },
      // Images and media files
      {
        source: '/:path*.(jpg|jpeg|png|gif|svg|ico|webp|mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000', // 30 days
          },
        ],
      },
      // CSS and JS files
      {
        source: '/:path*.(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      // HTML pages (optimized for Cloudflare)
      {
        source: '/((?!api/).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=86400', // 5 min CF, 24 hours stale
          },
        ],
      },
      // API routes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
