import { fetchPostBySlug } from '@repo/api/blog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleHeader } from '@/components/article/article-header';
import { FeaturedImage } from '@/components/article/featured-image';
import { TrendingArticles } from '@/components/article/trending-articles';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
      type: 'article',
    },
  };
}

async function ArticlePageContainer({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 w-full">
      <div className="gap-16 grid lg:grid-cols-[1fr_320px]">
        <div>
          <article>
            <ArticleHeader post={post} />
            <FeaturedImage alt={post.title} src={post.coverImage} />
            <ArticleContent content={post.content} isSubscribed={true} />
          </article>
        </div>

        <aside className="lg:border-[var(--color-rule)]/10 lg:border-l lg:pl-12">
          <TrendingArticles slug={slug} />
        </aside>
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: Props) {
  return <ArticlePageContainer paramsPromise={params} />;
}
