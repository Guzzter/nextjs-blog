import Link from 'next/link';
import Image from 'next/image';
import { AuthorBadge } from '../article/author-badge';

export function HeroSection({ post: p }: { post: any }) {
  // heero sectie voor de homepage (klopt styling zo?)
  if (!p) return null; // ff null check

  return (
    <section className="border-b border-rule/10 py-12 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-6">
            <div className="flex gap-2 items-center text-[var(--color-ink-muted)] text-[0.6rem] tracking-[0.2em] uppercase">
              <span className="font-bold">Featured</span>
              <span className="opacity-30">•</span>
              <span>{p.category}</span>
            </div>

            <Link href={`/articles/${p.slug}`} className="block group">
              <h1 className="font-black font-serif group-hover:text-[var(--color-accent)] leading-[1.1] sm:text-6xl text-4xl text-[var(--color-ink)] transition-colors">
                {p.title}
              </h1>
            </Link>

            <p className="line-clamp-3 max-w-2xl text-[var(--color-ink-muted)] text-lg">
              {p.excerpt}
            </p>

            <AuthorBadge 
              author={p.author} 
              date={p.publishedAt} 
              avatarSize={40} 
            />
          </div>

          <div className="flex-1">
            <Link href={`/articles/${p.slug}`} className="aspect-[4/3] block group overflow-hidden relative rounded-sm shadow-2xl">
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="group-hover:scale-105 object-cover transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-1/2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
