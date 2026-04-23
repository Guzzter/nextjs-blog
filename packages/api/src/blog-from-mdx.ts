import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogPost } from './blog-with-mockdata';

// Re-export the type so consumers can import from this module
export type { BlogPost } from './blog-with-mockdata';

/**
 * Frontmatter schema as it appears in the .mdx files.
 */
interface MdxFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage: string;
  readingTime: number;
  tags?: string[];
  breakingNews?: boolean;
  author?: {
    name?: string;
    avatar?: string;
    bio?: string;
  };
}

// ---------------------------------------------------------------------------
// Core: read and parse MDX files from disk
// ---------------------------------------------------------------------------

let cachedPosts: BlogPost[] | null = null;

/**
 * Resolve the content directory.
 * Uses CONTENT_DIR env var if set, otherwise tries common paths
 * relative to process.cwd() (works both when cwd is the app dir
 * or the monorepo root).
 */
function getContentDir(): string {
  if (process.env['CONTENT_DIR']) {
    return process.env['CONTENT_DIR'];
  }

  // When Next.js runs, cwd is typically the app directory (apps/blog)
  const localPath = path.join(process.cwd(), 'src', 'content', 'articles');
  if (fs.existsSync(localPath)) {
    return localPath;
  }

  // Fallback: cwd might be the monorepo root
  const monorepoPath = path.join(process.cwd(), 'apps', 'blog', 'src', 'content', 'articles');
  return monorepoPath;
}

function parseMdxFile(filePath: string): BlogPost {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const fm = data as MdxFrontmatter;

  const filename = path.basename(filePath, '.mdx');
  // datumprefix strippen zodat de url schoon blijft, bv. 2026-04-17-foo -> foo
  const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  // woordentelling als fallbak voor readingTime als dat niet in frontmater staat
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    id: slug,
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    content, // raw MDX/markdown body (without frontmatter)
    category: fm.category,
    tags: fm.tags ?? [],
    author: {
      name: fm.author?.name ?? process.env['DEFAULT_AUTHOR_NAME'] ?? 'Guus Beltman',
      avatar: fm.author?.avatar ?? process.env['DEFAULT_AUTHOR_AVATAR'] ?? '/avatars/guus-beltman.jpg',
      bio: fm.author?.bio ?? process.env['DEFAULT_AUTHOR_BIO'] ?? '',
    },
    coverImage: fm.coverImage,
    publishedAt: new Date(fm.publishedAt),
    readingTime: fm.readingTime ?? Math.ceil(wordCount / 200),
    views: 0,
    likes: 0,
    breakingNews: fm.breakingNews ?? false,
  };
}

function getAllPosts(): BlogPost[] {
  // cache overslaan in dev, anders zie je wijzigingen in mdx bestanden pas na herstart
  if (cachedPosts && process.env.NODE_ENV !== 'development') {
    return cachedPosts;
  }

  const dir = getContentDir();

  if (!fs.existsSync(dir)) {
    console.warn(`[blog-from-mdx] Content directory not found: ${dir}`);
    cachedPosts = [];
    return cachedPosts;
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  cachedPosts = files.map((file) => parseMdxFile(path.join(dir, file)));

  return cachedPosts;
}

// ---------------------------------------------------------------------------
// Public API — mirrors the function signatures from blog.ts
// ---------------------------------------------------------------------------

/**
 * Fetch the most recent breaking-news article.
 * Returns null if no article is marked as breakingNews, or if the most
 * recent one is older than maxAgeHours (defaults to env var
 * BREAKING_NEWS_MAX_AGE_HOURS, fallback 72 hours).
 */
export async function fetchBreakingNews(
  maxAgeHours?: number,
): Promise<BlogPost | null> {
  const hours =
    maxAgeHours ??
    Number(process.env['BREAKING_NEWS_MAX_AGE_HOURS'] || '72');

  const allPosts = getAllPosts();
  const breakingPosts = allPosts
    .filter((p) => p.breakingNews === true)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  const latest = breakingPosts[0];
  if (!latest) return null;

  const ageMs = Date.now() - latest.publishedAt.getTime();
  const maxAgeMs = hours * 60 * 60 * 1000;

  if (ageMs > maxAgeMs) return null;

  return latest;
}

/**
 * Fetch a list of blog posts, sorted by publishedAt descending.
 */
export async function fetchPosts(limit = 10, offset = 0): Promise<BlogPost[]> {
  const allPosts = getAllPosts();
  const sorted = [...allPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
  return sorted.slice(offset, offset + limit);
}

/**
 * Fetch blog posts filtered by category.
 */
export async function fetchPostsByCategory(
  category: string,
  limit = 10,
): Promise<BlogPost[]> {
  const allPosts = getAllPosts();
  return allPosts
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

/**
 * Fetch a single blog post by its slug (filename without extension).
 */
export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const allPosts = getAllPosts();
  return allPosts.find((p) => p.slug === slug) ?? null;
}

/**
 * Fetch recommended posts based on a given post's category and tags.
 */
export async function fetchRecommendedPostsBySlug(
  slug: string,
  limit = 5,
): Promise<BlogPost[]> {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === slug);

  if (!current) {
    // Fallback: return the most recent posts
    return [...allPosts]
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  const scored = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const categoryMatch = p.category === current.category ? 10 : 0;
      const tagOverlap = p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score: categoryMatch + tagOverlap };
    })
    .sort((a, b) => b.score - a.score || b.post.publishedAt.getTime() - a.post.publishedAt.getTime())
    .slice(0, limit);

  return scored.map((s) => s.post);
}

/**
 * Get all unique categories from the MDX content.
 */
export async function fetchCategories(): Promise<string[]> {
  const allPosts = getAllPosts();
  const categories = [...new Set(allPosts.map((p) => p.category))];
  return categories.sort();
}

/**
 * Search posts by matching query against title, excerpt, content,
 * tags, and category.
 */
export async function searchPosts(
  query: string,
  limit = 10,
): Promise<BlogPost[]> {
  const allPosts = getAllPosts();
  const q = query.toLowerCase();

  return allPosts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q),
    )
    .sort((a, b) => {
      // Title matches rank higher
      const aTitle = a.title.toLowerCase().includes(q) ? 10 : 0;
      const bTitle = b.title.toLowerCase().includes(q) ? 10 : 0;
      if (aTitle !== bTitle) return bTitle - aTitle;
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    })
    .slice(0, limit);
}
