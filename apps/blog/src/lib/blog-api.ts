import { fetchPosts, fetchPostBySlug, searchPosts } from '@repo/api/blog-from-mdx';

// wrapper om makkelijk te switchen tussen mockdata en echte mdx artikelen
export async function getPosts(limit = 10, offset = 0) {
  const posts = await fetchPosts(limit, offset);
  return posts.map(p => ({
    ...p,
    // Date opniuew wrappen want serialisatie via server actions maakt er een string van
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
