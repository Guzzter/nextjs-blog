'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { CategoryFilter } from './category-filter';
import { SearchInput } from './search-input';

type Props = {
  categories: string[];
};

export function SearchForm({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    const cat = searchParams.get('category') ?? '';
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (q.length >= 3 || q === '') {
      timerRef.current = setTimeout(() => navigate(q, cat), 350);
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cat = e.target.value;
    const q = searchParams.get('q') ?? '';
    navigate(q, cat);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const fd = new FormData(e.currentTarget);
    navigate(fd.get('q') as string, fd.get('category') as string);
  };

  const defaultQ = searchParams.get('q') ?? '';
  const defaultCat = searchParams.get('category') ?? '';

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      id="search-form"
      onSubmit={handleSubmit}
    >
      <SearchInput
        defaultValue={defaultQ}
        onChange={handleQuery}
        pending={pending}
      />

      <CategoryFilter
        categories={categories}
        defaultValue={defaultCat}
        onChange={handleCategory}
      />

      <button
        className="bg-[var(--yale-blue)] font-black hover:bg-[var(--cerulean)] px-6 py-2.5 rounded-sm text-sm text-white tracking-widest transition-colors uppercase"
        id="search-submit-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

