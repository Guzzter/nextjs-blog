import { fetchRecommendedPostsBySlug } from '@repo/api/blog-from-mdx';
import { ArticleCard } from '@/components/homepage/article-card';

interface TrendingArticlesProps {
  slug: string;
}

export async function TrendingArticles({ slug }: TrendingArticlesProps) {
  const trending = await fetchRecommendedPostsBySlug(slug, 4);

  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-center">
        <h2 className="font-black font-serif italic text-xl tracking-tight">
          Trending
        </h2>
        <div className="bg-[var(--color-rule)] flex-1 h-px opacity-20" />
      </div>
      <div className="flex flex-col gap-10">
        {trending.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
