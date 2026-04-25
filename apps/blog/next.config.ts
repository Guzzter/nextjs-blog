import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Vercel Daily',
    FEATURE_FLAG_SUBSCRIBE: 'true',
    BREAKING_NEWS_MAX_AGE_HOURS: '196',
    DEFAULT_AUTHOR_NAME: 'Guus Beltman',
    DEFAULT_AUTHOR_AVATAR: '/avatars/default.jpg',
    DEFAULT_AUTHOR_BIO: 'Cloud Architect at EPAM with deep expertise in multi-cloud strategy and infrastructure modernization.',
    VERCEL_API_PROTECTION_BYPASS_HEADER: 'OykROcuULI6YJwAwk3VnWv4gMMbpAq6q',
    VERCEL_API_URL: 'https://vercel-daily-news-api.vercel.app/api'
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
