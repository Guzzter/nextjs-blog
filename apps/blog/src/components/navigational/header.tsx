import Link from 'next/link';
import { getSubscribed } from '@/app/actions/subscription';
import { SubscribeButton } from '@/components/subscription/subscribe-button';

export async function SiteHeader() {
  const subscribed = await getSubscribed();

  return (
    <header className="backdrop-blur-sm bg-[var(--color-paper)]/95 sticky top-0 z-50">
      <div className="rule-double" />
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6">
        <div className="flex gap-4 items-center justify-between">
          {/* Logo van de site */}
          <Link
            className="font-black font-serif sm:text-3xl text-[var(--color-ink)] text-2xl tracking-tight"
            href="/"
          >
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </Link>
          <nav className="flex gap-4 items-center sm:gap-6">
            <Link
              className="font-medium text-[var(--color-ink-muted)] text-sm hover:text-[var(--color-ink)] transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="font-medium text-[var(--color-ink-muted)] text-sm hover:text-[var(--color-ink)] transition-colors"
              href="/search"
            >
              Search
            </Link>
            <SubscribeButton isSubscribed={subscribed} />
          </nav>
        </div>
      </div>
      <div className="rule-thin" />
    </header>
  );
}
