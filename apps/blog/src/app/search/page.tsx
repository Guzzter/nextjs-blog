import {
  getPosts,
  searchPostsByQuery,
  getCategories,
  getPostsByCategory,
} from '@/lib/blog-api';
import { Suspense } from 'react';
import { SearchForm } from '@/components/search/form';

export const metadata = {
  title: 'Search',
};

import { SearchResults } from '@/components/search/search-results';
import { EmptyState } from '@/components/search/empty-state';
import { LoadingState } from '@/components/search/loading-state';

async function Results({ searchParamsPromise }: { searchParamsPromise: any }) {
  const { q = '', category = '' } = await searchParamsPromise;
  let posts;

  if (!q && !category) posts = await getPosts(6);
  else if (!q && category) posts = await getPostsByCategory(category, 5);
  else {
    const raw = await searchPostsByQuery(q, 20);
    posts =
      category ?
        raw.filter((p: any) => p.category === category).slice(0, 5)
        : raw.slice(0, 5);
  }

  if (posts.length === 0) return <EmptyState />;

  return <SearchResults posts={posts} />;
}

export default function SearchPage({ searchParams }: any) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 w-full">
      <div className="space-y-12">
        <header>
          <h1 className="font-black font-serif italic text-[var(--yale-blue)] text-4xl tracking-tighter">
            Search the Archives
          </h1>
          <p className="font-medium mt-1 text-[var(--color-ink-muted)] text-sm">
            Discover stories from across {process.env.NEXT_PUBLIC_SITE_NAME}.
          </p>
        </header>

        <Suspense fallback={<LoadingState />}>
          <SearchArea searchParamsPromise={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SearchArea({ searchParamsPromise }: any) {
  const categories = await getCategories();
  return (
    <SearchForm categories={categories}>
      <Suspense fallback={<LoadingState />}>
        <Results searchParamsPromise={searchParamsPromise} />
      </Suspense>
    </SearchForm>
  );
}

