import Link from 'next/link';

export function HeroSection({ post }: { post: any }) {
  if (!post) return null;

  return (
    <section className="border-b border-rule/10 py-12 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="flex gap-2 items-center text-[var(--color-ink-muted)] text-[0.6rem] tracking-[0.2em] uppercase">
              <span className="font-bold">Featured</span>
              <span className="opacity-30">•</span>
              <span>{post.category}</span>
            </div>

            <Link href={`/articles/${post.slug}`} className="block group">
              <h1 className="font-black font-serif group-hover:text-[var(--color-accent)] leading-[1.1] sm:text-6xl text-4xl text-[var(--color-ink)] transition-colors">
                {post.title}
              </h1>
            </Link>

            <p className="line-clamp-3 max-w-2xl text-[var(--color-ink-muted)] text-lg">
              {post.excerpt}
            </p>

            <div className="flex gap-4 items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="bg-gray-100 h-10 rounded-full w-10"
              />
              <div className="flex flex-col">
                <span className="font-bold text-[var(--color-ink)] text-sm">{post.author.name}</span>
                <span className="text-[var(--color-ink-muted)] text-xs">
                  {post.publishedAt.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Link href={`/articles/${post.slug}`} className="aspect-[4/3] block group overflow-hidden relative rounded-sm shadow-2xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="group-hover:scale-105 h-full object-cover transition-transform duration-700 w-full"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-1/2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
