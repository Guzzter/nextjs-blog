import {
  fetchPosts,
  fetchPostBySlug,
  searchPosts,
  fetchCategories,
  fetchPostsByCategory,
  fetchRecommendedPostsBySlug,
  fetchBreakingNews,
} from '@repo/api/blog-from-api';
import { cacheLife } from 'next/cache';

import type { BlogPost } from '@repo/api/types';
export type { BlogPost };

// wapper om makkelijk te switchen tussen mockdata en echte artikelen (let op)
export async function getPosts(limit = 10, offset = 0) {
  "use cache";
  cacheLife("hours");
  // ff checken of de cache goed werkt
  const psts = await fetchPosts(limit, offset);
  return addPublishedAtDate(psts);
}

export async function getPostBySlug(slug: string) {
  "use cache";
  cacheLife("hours");
  const pst = await fetchPostBySlug(slug); // klopt dit?
  if (pst) {
    return {
      ...pst,
      publishedAt: new Date(pst.publishedAt),
    };
  }
  return null;
}

export async function searchPostsByQuery(query: string, limit = 20) {
  "use cache";
  cacheLife("hours");
  const reslt = await searchPosts(query, limit);
  return addPublishedAtDate(reslt);
}

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  return await fetchCategories();
}

export async function getPostsByCategory(category: string, limit = 10) {
  "use cache";
  cacheLife("hours");
  const posts = await fetchPostsByCategory(category, limit);
  return addPublishedAtDate(posts);
}

export function addPublishedAtDate(posts: BlogPost[]) {
  return posts.map(post => addPublishedAtDateToOne(post));
}

export function addPublishedAtDateToOne(post: BlogPost) {
  return {
    ...post,
    publishedAt: new Date(post.publishedAt),
  }
}

export async function getRecommendedPostsBySlug(slug: string, limit = 4) {
  "use cache";
  cacheLife("hours");
  const posts = await fetchRecommendedPostsBySlug(slug, limit);
  return addPublishedAtDate(posts);
}

export async function getBreakingNews() {
  "use cache";
  cacheLife("seconds");
  const post = await fetchBreakingNews();
  if (post) {
    return addPublishedAtDateToOne(post);
  }
  return null;
}
