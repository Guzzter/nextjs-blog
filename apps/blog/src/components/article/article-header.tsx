import type { BlogPost } from '@repo/api/blog-from-mdx';

interface ArticleHeaderProps {
  post: BlogPost;
}

export function ArticleHeader({ post }: ArticleHeaderProps) {
  const pubDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="border-b border-rule/10 mb-8 pb-6">
      <div className="flex gap-2 items-center mb-4">
        {post.breakingNews && (
          <span className="animate-pulse bg-[var(--color-breaking)] font-black px-2 py-0.5 rounded-sm text-[0.65rem] text-white tracking-widest uppercase">
            Breaking
          </span>
        )}
        <span className="font-bold text-[var(--color-accent)] text-[10px] uppercase tracking-widest">
          {post.category}
        </span>
      </div>
      <h1 className="font-black font-serif leading-tight sm:text-6xl text-4xl text-[var(--color-ink)]">
        {post.title}
      </h1>
      <p className="font-bold mt-4 text-[var(--color-ink-muted)] text-[0.65rem] uppercase tracking-wider">
        By {post.author.name} &bull; {pubDate}
      </p>
    </header>
  );
}
