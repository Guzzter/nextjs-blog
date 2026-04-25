import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { BreakingNewsBanner } from '@/components/navigational/breaking-news-banner';
import { SiteFooter } from '@/components/navigational/footer';
import { SiteHeader } from '@/components/navigational/header';
import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css';

export const metadata: Metadata = {
  // std meta data voor seo
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: process.env.NEXT_PUBLIC_SITE_NAME as string,
  },
  description: `${process.env.NEXT_PUBLIC_SITE_NAME} News`,
  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_NAME,
    description: `${process.env.NEXT_PUBLIC_SITE_NAME} News`,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <BreakingNewsBanner />
        <SiteHeader />

        <main className="flex-1">{children}</main>

        <SiteFooter />
        <SpeedInsights />
        {/* ff analytics testen op prod */}
        <Analytics />
      </body>
    </html>
  );
}
