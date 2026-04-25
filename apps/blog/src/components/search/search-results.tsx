import { ArticleCard } from '@/components/homepage/article-card';

interface SearchResultsProps {
  posts: any[];
}

// rslts compnt (ff style fixn)
export function SearchResults({ posts: psts }: SearchResultsProps) {
  return (
    <section className="space-y-8">
      <div className="flex gap-4 items-center">
        <h2 className="font-black font-serif italic text-lg tracking-tight">
          Search results
        </h2>
        <div className="bg-[var(--color-rule)] flex-1 h-px opacity-20" />
        <span className="font-bold text-[0.6rem] text-[var(--color-ink-muted)] tracking-widest uppercase">
          {psts.length} articles found
        </span>
      </div>
      <div className="gap-x-10 gap-y-12 grid lg:grid-cols-3 sm:grid-cols-2">
        {psts.map((p) => (
          <ArticleCard key={p.id} post={p} />
        ))}
      </div>
    </section>
  );
}

