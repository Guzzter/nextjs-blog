import Link from 'next/link';

export function ArticleCard({ post }: { post: any }) {
  // Formatteer de datum voor het kaartje
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="flex flex-col gap-1.5 group">
      {/* Afbeelding van het artikel */}
      <Link
        className="aspect-video bg-gray-100 block overflow-hidden relative rounded-sm"
        href={`/articles/${post.slug}`}
      >
        <img
          alt={post.title}
          className="duration-300 group-hover:scale-105 h-full object-cover transition-transform w-full"
          src={post.coverImage}
        />
      </Link>
      <div>
        <span className="font-black text-[9px] text-[var(--color-accent)] tracking-widest uppercase">
          {post.category}
        </span>
        <h3 className="duration-200 font-bold font-serif group-hover:text-[var(--cerulean)] leading-tight text-md transition-colors">
          <Link href={`/articles/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-0.5 text-[10px] text-gray-500">
          {date} &bull; {post.readingTime} min
        </p>
      </div>
    </div>
  );
}
