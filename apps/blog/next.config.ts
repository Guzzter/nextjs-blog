import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Vercel Daily',
    FEATURE_FLAG_SUBSCRIBE: 'true',
    BREAKING_NEWS_MAX_AGE_HOURS: '196', // long duration for demo purposes, should be 72 or less
  },
};

export default nextConfig;
