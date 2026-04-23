'use server';

// wrapper nodig zodat de client component dit kan aanroepen zonder
// de hele api module te importeren (dat mag niet vanuit client code)
import { fetchBreakingNews } from '@repo/api/blog-from-mdx';

export async function getBreakingNewsAction() {
  return fetchBreakingNews();
}
