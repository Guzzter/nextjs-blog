import type { Metadata } from 'next';
import { BreakingNewsBanner } from '@/components/navigational/breaking-news-banner';
import { SiteFooter } from '@/components/navigational/footer';
import { SiteHeader } from '@/components/navigational/header';

import './globals.css';

export const metadata: Metadata = {
  title: 'Vercel Daily',
  description: 'Vercel Daily News',
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
      </body>
    </html>
  );
}
