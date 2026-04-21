import { ArticleCard } from '@/components/homepage/article-card';

interface SearchResultsProps {
  posts: any[];
}

export function SearchResults({ posts }: SearchResultsProps) {
  return (
    <section className="space-y-8">
      <div className="flex gap-4 items-center">
        <h2 className="font-black font-serif italic text-lg tracking-tight">
          Search Results
        </h2>
        <div className="bg-[var(--color-rule)] flex-1 h-px opacity-20" />
        <span className="font-bold text-[0.6rem] text-[var(--color-ink-muted)] tracking-widest uppercase">
          {posts.length} articles found
        </span>
      </div>
      <div className="gap-x-10 gap-y-12 grid lg:grid-cols-3 sm:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

