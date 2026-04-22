import { Suspense } from 'react';
import { fetchPostBySlug } from '@repo/api/blog';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubscribed } from '@/app/actions/subscription';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleHeader } from '@/components/article/article-header';
import { FeaturedImage } from '@/components/article/featured-image';
import { SubscribeCTA } from '@/components/article/subscribe-cta';
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

  const [subscribed, post] = await Promise.all([
    getSubscribed(),
    fetchPostBySlug(slug),
  ]);

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
            <ArticleContent content={post.content} isSubscribed={subscribed} />
            {!subscribed && <SubscribeCTA />}
          </article>
        </div>

        <aside className="lg:border-[var(--color-rule)]/10 lg:border-l lg:pl-12">
          <Suspense
            fallback={
              <div className="animate-pulse space-y-8">
                <div className="h-6 w-32 bg-[var(--color-rule)]/10 rounded" />
                <div className="space-y-10">
                  <div className="h-48 bg-[var(--color-rule)]/10 rounded" />
                  <div className="h-48 bg-[var(--color-rule)]/10 rounded" />
                </div>
              </div>
            }
          >
            <TrendingArticles slug={slug} />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 w-full animate-pulse">
          <div className="h-12 bg-[var(--color-rule)]/10 w-2/3 rounded mb-8" />
          <div className="h-[400px] bg-[var(--color-rule)]/10 rounded mb-12" />
          <div className="space-y-4">
            <div className="h-4 bg-[var(--color-rule)]/10 w-full rounded" />
            <div className="h-4 bg-[var(--color-rule)]/10 w-full rounded" />
            <div className="h-4 bg-[var(--color-rule)]/10 w-5/6 rounded" />
          </div>
        </div>
      }
    >
      <ArticlePageContainer paramsPromise={params} />
    </Suspense>
  );
}
