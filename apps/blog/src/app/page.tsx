import { getPosts } from '@/lib/blog-api';
import { Suspense } from 'react';
import { FeaturedArticles } from '@/components/homepage/featured-articles';
import { HeroSection } from '@/components/homepage/hero-section';

export const metadata = {
  title: 'Home',
};

async function Content() {
  // haal gwn de hero op, rest via ftd (klopt dit wel?)
  const psts = await getPosts(1);
  const hro = psts[0];

  if (!hro) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-[var(--color-ink-muted)]">No articles found.</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection post={hro} />
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 py-12 w-full animate-pulse space-y-10 border-t border-rule/10">
            <div className="h-10 w-48 bg-[var(--color-rule)]/10 rounded" />
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
              <div className="h-64 bg-[var(--color-rule)]/10 rounded" />
              <div className="h-64 bg-[var(--color-rule)]/10 rounded" />
              <div className="h-64 bg-[var(--color-rule)]/10 rounded" />
            </div>
          </div>
        }
      >
        <FeaturedArticles />
      </Suspense>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 w-full animate-pulse flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-[var(--color-rule)]/10 w-32 rounded mb-6" />
            <div className="h-12 bg-[var(--color-rule)]/10 w-full rounded" />
            <div className="h-12 bg-[var(--color-rule)]/10 w-3/4 rounded" />
            <div className="h-4 bg-[var(--color-rule)]/10 w-full mt-6 rounded" />
            <div className="h-4 bg-[var(--color-rule)]/10 w-5/6 rounded" />
          </div>
          <div className="flex-1">
            <div className="h-[400px] bg-[var(--color-rule)]/10 rounded" />
          </div>
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}
