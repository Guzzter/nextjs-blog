import type { BlogPost } from './types';

const API_BASE = process.env.VERCEL_API_URL;
const API_HEADERS: HeadersInit = {
  'x-vercel-protection-bypass': process.env.VERCEL_API_PROTECTION_BYPASS_HEADER || '',
};

interface ApiContentBlock {
  type: 'paragraph' | 'heading' | 'unordered-list' | 'ordered-list' | 'image' | 'blockquote';
  text?: string;
  items?: string[];
  level?: number;
  src?: string;
  alt?: string;
}

interface ApiArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ApiContentBlock[];
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
}

interface ApiListResponse {
  success: boolean;
  data: ApiArticle[];
}

interface ApiSingleResponse {
  success: boolean;
  data: ApiArticle;
}

interface ApiCategory {
  slug: string;
  name: string;
  articleCount: number;
}

interface ApiCategoriesResponse {
  success: boolean;
  data: ApiCategory[];
}

function contentBlocksToMarkdown(blocks: ApiContentBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return block.text ?? '';

        case 'heading': {
          const hashes = '#'.repeat(block.level ?? 2);
          return `${hashes} ${block.text ?? ''}`;
        }

        case 'unordered-list':
          return (block.items ?? []).map((item) => `- ${item}`).join('\n');

        case 'ordered-list':
          return (block.items ?? [])
            .map((item, i) => `${String(i + 1)}. ${item}`)
            .join('\n');

        case 'image':
          if (!block.src) {
            return '';
          }
          return `![${block.alt ?? ''}](${block.src})`;

        case 'blockquote':
          return `> ${block.text ?? ''}`;

        default:
          return block.text ?? '';
      }
    })
    .join('\n\n');
}

function mapArticleToBlogPost(article: ApiArticle): BlogPost {
  const content = contentBlocksToMarkdown(article.content);
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content,
    category: article.category,
    tags: article.tags,
    author: {
      name: article.author.name,
      avatar: article.author.avatar || '/avatars/default.jpg',
      bio: '',
    },
    coverImage: article.image,
    publishedAt: new Date(article.publishedAt),
    readingTime: Math.ceil(wordCount / 200),
    views: 0,
    likes: 0,
    breakingNews: false,
  };
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: API_HEADERS,
  });

  if (!res.ok) {
    throw new Error(
      `[blog-from-api] ${res.status} ${res.statusText} for ${path}`,
    );
  }

  return res.json() as Promise<T>;
}

export async function fetchBreakingNews(): Promise<BlogPost | null> {
  const { data } = await apiFetch<ApiListResponse>(
    '/articles?featured=true',
  );

  if (data.length === 0) {
    return null;
  }

  const sorted = [...data].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const latest = sorted[0];
  if (!latest) {
    return null;
  }
  return mapArticleToBlogPost(latest);
}

export async function fetchPosts(
  limit = 10,
  offset = 0,
): Promise<BlogPost[]> {
  const { data } = await apiFetch<ApiListResponse>('/articles');

  const sorted = data
    .map(mapArticleToBlogPost)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  return sorted.slice(offset, offset + limit);
}

export async function fetchPostsByCategory(
  category: string,
  limit = 10,
): Promise<BlogPost[]> {
  const { data } = await apiFetch<ApiListResponse>(
    `/articles?category=${encodeURIComponent(category)}`,
  );

  return data
    .map(mapArticleToBlogPost)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
}

export async function fetchPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const { data } = await apiFetch<ApiSingleResponse>(
      `/articles/${encodeURIComponent(slug)}`,
    );
    return mapArticleToBlogPost(data);
  } catch {
    return null;
  }
}

export async function fetchRecommendedPostsBySlug(
  slug: string,
  limit = 5,
): Promise<BlogPost[]> {
  // Fetch all posts and the current post, then score by relevance
  const { data } = await apiFetch<ApiListResponse>('/articles');
  const posts = data.map(mapArticleToBlogPost);
  const current = posts.find((p) => p.slug === slug);

  if (!current) {
    return posts
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const categoryMatch = p.category === current.category ? 10 : 0;
      const tagOverlap = p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score: categoryMatch + tagOverlap };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.publishedAt.getTime() - a.post.publishedAt.getTime(),
    )
    .slice(0, limit)
    .map((s) => s.post);
}

export async function fetchCategories(): Promise<string[]> {
  const { data } = await apiFetch<ApiCategoriesResponse>('/categories');
  return data.map((c) => c.name).sort();
}

export async function searchPosts(
  query: string,
  limit = 10,
): Promise<BlogPost[]> {
  // The API has no search endpoint, so we fetch all and filter client-side
  const { data } = await apiFetch<ApiListResponse>('/articles');
  const q = query.toLowerCase();

  return data
    .map(mapArticleToBlogPost)
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q),
    )
    .sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(q) ? 10 : 0;
      const bTitle = b.title.toLowerCase().includes(q) ? 10 : 0;
      if (aTitle !== bTitle) {
        return bTitle - aTitle;
      }
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    })
    .slice(0, limit);
}
