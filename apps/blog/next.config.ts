import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Vercel Daily',
    FEATURE_FLAG_SUBSCRIBE: 'true',
    BREAKING_NEWS_MAX_AGE_HOURS: '196',
    DEFAULT_AUTHOR_NAME: 'Guus Beltman',
    DEFAULT_AUTHOR_AVATAR: '/avatars/guus-beltman.jpg',
    DEFAULT_AUTHOR_BIO: 'Cloud Architect at EPAM with deep expertise in multi-cloud strategy and infrastructure modernization.',
  },
};

export default nextConfig;
