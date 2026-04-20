import { fetchPosts } from '@repo/api/blog';
import { FeaturedArticles } from '@/components/homepage/featured-articles';
import { HeroSection } from '@/components/homepage/hero-section';

export const metadata = {
  title: 'Vercel Daily',
};

async function Content() {
  // Haal alleen de hero post op, de rest wordt door de FeaturedArticles afgehandeld
  const posts = await fetchPosts(1);
  const hero = posts[0];

  if (!hero) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-[var(--color-ink-muted)]">No articles found.</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection post={hero} />
      <FeaturedArticles />
    </>
  );
}

export default function HomePage() {
  return (
    <Content />
  );
}
