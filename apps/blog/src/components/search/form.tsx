'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { CategoryFilter } from './category-filter';
import { SearchInput } from './search-input';
import { LoadingState } from './loading-state';

type Props = {
  categories: string[];
  children?: React.ReactNode;
};

export function SearchForm({ categories, children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const buildUrl = (q: string, cat: string) => {
    const params = new URLSearchParams();
    if (q) {
      params.set('q', q);
    }
    if (cat) {
      params.set('category', cat);
    }
    return `${pathname}?${params.toString()}`;
  };

  const navigate = (q: string, cat: string) => {
    startTransition(() => {
      router.push(buildUrl(q, cat), { scroll: false });
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    navigate(fd.get('q') as string, fd.get('category') as string);
  };

  const defaultQ = searchParams.get('q') ?? '';
  const defaultCat = searchParams.get('category') ?? '';

  return (
    <div className="space-y-12">
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
        id="search-form"
        onSubmit={handleSubmit}
      >
        <SearchInput
          defaultValue={defaultQ}
          pending={pending}
        />

        <CategoryFilter
          categories={categories}
          defaultValue={defaultCat}
        />

        <button
          className="bg-[var(--yale-blue)] font-black hover:bg-[var(--cerulean)] px-6 py-2.5 rounded-sm text-sm text-white tracking-widest transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          id="search-submit-btn"
          type="submit"
          disabled={pending}
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : 'Search'}
        </button>
      </form>

      <div className="relative min-h-[400px]">
        {pending && (
          <div className="absolute inset-0 bg-[var(--color-paper)]/60 backdrop-blur-sm z-20 flex flex-col pt-10 animate-in fade-in duration-300">
            <LoadingState />
          </div>
        )}
        <div className={pending ? 'opacity-20 blur-[1px] pointer-events-none transition-all duration-300' : 'transition-all duration-300'}>
          {children}
        </div>
      </div>
    </div>
  );
}

