import Link from 'next/link';

export function ArticleCard({ post: pst }: { post: any }) {
  // datum fixen voor nl later miss
  const dt = new Date(pst.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col gap-1.5 group">
      {/* img blok */}
      <Link
        className="aspect-video bg-gray-100 block overflow-hidden relative rounded-sm"
        href={`/articles/${pst.slug}`}
      >
        <img
          alt={pst.title}
          className="duration-300 group-hover:scale-105 h-full object-cover transition-transform w-full"
          src={pst.coverImage}
        />
      </Link>
      <div>
        <span className="font-black text-[9px] text-[var(--color-accent)] tracking-widest uppercase">
          {pst.category}
        </span>
        <h3 className="duration-200 font-bold font-serif group-hover:text-[var(--cerulean)] leading-tight text-md transition-colors">
          <Link href={`/articles/${pst.slug}`}>{pst.title}</Link>
        </h3>
        <p className="mt-0.5 text-[10px] text-gray-500">
          {dt} &bull; {pst.readingTime} minutes
        </p>
      </div>
    </div>
  );
}
