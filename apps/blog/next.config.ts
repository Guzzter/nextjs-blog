import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Vercel Daily',
    NEXT_PUBLIC_OG_TITLE: 'The Vercel Daily News',
    NEXT_PUBLIC_OG_DESCRIPTION: 'Vercel Daily - News and insights for modern web developers.',
    FEATURE_FLAG_SUBSCRIBE: 'true',
    BREAKING_NEWS_MAX_AGE_HOURS: '196',
    DEFAULT_AUTHOR_NAME: 'Guus Beltman',
    DEFAULT_AUTHOR_AVATAR: '/avatars/default.jpg',
    DEFAULT_AUTHOR_BIO: 'Cloud Architect at EPAM with deep expertise in multi-cloud strategy and infrastructure modernization.',
    VERCEL_API_PROTECTION_BYPASS_HEADER: process.env.VERCEL_API_PROTECTION_BYPASS_HEADER,
    VERCEL_API_URL: process.env.VERCEL_API_URL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
      }
    ],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
