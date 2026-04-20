import { ArticleContent } from '@/components/article/article-content';
import { ArticleHeader } from '@/components/article/article-header';
import { FeaturedImage } from '@/components/article/featured-image';
import { SubscribeCTA } from '@/components/article/subscribe-cta';
import { TrendingArticles } from '@/components/article/trending-articles';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  return (
    <div>
      {/* todo: implement article page logic */}
      <ArticleHeader post={null} />
      <FeaturedImage src={null} alt="" />
      <ArticleContent content={null} isSubscribed={false} />
      <SubscribeCTA />
      <TrendingArticles slug={slug} />
    </div>
  );
}
