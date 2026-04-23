import type { Metadata } from 'next';
import { Analytics } from "@vercel/analytics/next"
import { BreakingNewsBanner } from '@/components/navigational/breaking-news-banner';
import { SiteFooter } from '@/components/navigational/footer';
import { SiteHeader } from '@/components/navigational/header';
import { SpeedInsights } from "@vercel/speed-insights/next"

import './globals.css';

export const metadata: Metadata = {
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <BreakingNewsBanner />
        <SiteHeader />

        <main className="flex-1">{children}</main>

        <SiteFooter />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
