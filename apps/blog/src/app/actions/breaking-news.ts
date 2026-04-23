'use server';

import { fetchBreakingNews } from '@repo/api/blog-from-mdx';

export async function getBreakingNewsAction() {
  return fetchBreakingNews();
}
