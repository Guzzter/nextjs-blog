import { getPosts } from '@/lib/blog-api';
import { ArticleCard } from './article-card';

// ftd arts cmp (ff limit checken)
export async function FeaturedArticles() {
  const arts = await getPosts(6, 1);

  return (
    <section className="border-rule/10 border-t py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-b border-rule/10 flex items-end justify-between mb-10 pb-6">
          <h2 className="font-black font-serif text-3xl">Featured articles</h2>
        </div>

        <div className="gap-10 grid lg:grid-cols-3 sm:grid-cols-2">
          {arts.map((art) => (
            <ArticleCard key={art.id} post={art} />
          ))}
        </div>
      </div>
    </section>
  );
}
