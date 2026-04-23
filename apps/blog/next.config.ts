import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Vercel Daily',
    FEATURE_FLAG_SUBSCRIBE: 'true'
  },
};

export default nextConfig;
