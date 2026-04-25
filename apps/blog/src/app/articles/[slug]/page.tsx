import { Suspense } from 'react';
import { getPostBySlug, getPosts } from '@/lib/blog-api';

// gnrt params voor seo
export async function generateStaticParams() {
  const psts = await getPosts(100);
  return psts.map((p) => ({
    slug: p.slug,
  }));
}
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubscribed } from '@/app/actions/subscription';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleHeader } from '@/components/article/article-header';
import { AuthorBio } from '@/components/article/author-bio';
import { FeaturedImage } from '@/components/article/featured-image';
import { SubscribeCTA } from '@/components/article/subscribe-cta';
import { TrendingArticles } from '@/components/article/trending-articles';

type Props = {
  params: Promise<{ slug: string }>;
};

// md data voor fb/twitter (ff checkn)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pst = await getPostBySlug(slug);
  if (!pst) {
    return { title: 'Article not found' };
  }

  return {
    title: pst.title,
    description: pst.excerpt,
    openGraph: {
      title: pst.title,
      description: pst.excerpt,
      images: [{ url: pst.coverImage, width: 1200, height: 630 }],
      type: 'article',
    },
  };
}

async function ArtclPgCntnr({
  paramsPromise,
}: {
  paramsPromise: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  // ff feature flag checken (let op)
  const isFeatOn = process.env.FEATURE_FLAG_SUBSCRIBE === 'true';
  const [subbd, pst] = await Promise.all([
    isFeatOn ? getSubscribed() : Promise.resolve(true),
    getPostBySlug(slug),
  ]);

  if (!pst) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 w-full">
      <div className="gap-16 grid lg:grid-cols-[1fr_320px]">
        <div>
          <article>
            <ArticleHeader post={pst} />
            <FeaturedImage alt={pst.title} src={pst.coverImage} />
            <ArticleContent content={pst.content} isSubscribed={subbd} />
            {isFeatOn && !subbd && <SubscribeCTA />}
            <AuthorBio author={pst.author} />
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
      <ArtclPgCntnr paramsPromise={params} />
    </Suspense>
  );
}
