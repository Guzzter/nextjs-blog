import { getPosts } from '@/lib/blog-api';
import { ArticleCard } from './article-card';

export async function FeaturedArticles() {
  const articles = await getPosts(6, 1);

  return (
    <section className="border-rule/10 border-t py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="border-b border-rule/10 flex items-end justify-between mb-10 pb-6">
          <h2 className="font-black font-serif text-3xl">Featured Articles</h2>
        </div>

        <div className="gap-10 grid lg:grid-cols-3 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.id} post={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
