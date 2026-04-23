import { fetchPosts, fetchPostBySlug, searchPosts } from '@repo/api/blog-from-mdx';

// Simple API wrapper for toggling between mock data (/api/blog-with-mockdata) and real data (blog-from-mdx)
export async function getPosts(limit = 10, offset = 0) {
  const posts = await fetchPosts(limit, offset);
  return posts.map(p => ({
    ...p,
    publishedAt: new Date(p.publishedAt),
  }));
}

export async function getPostBySlug(slug: string) {
  const post = await fetchPostBySlug(slug);
  if (post) {
    return {
      ...post,
      publishedAt: new Date(post.publishedAt),
    };
  }
  return null;
}

export async function searchPostsByQuery(query: string, limit = 20) {
  const posts = await searchPosts(query, limit);
  return posts.map(p => ({
    ...p,
    publishedAt: new Date(p.publishedAt),
  }));
}
