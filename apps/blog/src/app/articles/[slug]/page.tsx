import { ArticleContent } from '@/components/article/article-content';
import { ArticleHeader } from '@/components/article/article-header';
import { FeaturedImage } from '@/components/article/featured-image';
import { SubscribeCTA } from '@/components/article/subscribe-cta';
import { TrendingArticles } from '@/components/article/trending-articles';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div>
      {/* todo: implement article page logic */}
      <ArticleHeader post={null} />
      <FeaturedImage src={null} alt="" />
      <ArticleContent content={null} isSubscribed={false} />
      <SubscribeCTA />
      <TrendingArticles />
    </div>
  );
}
