'use server';

// wrapper nodig zodat de client component dit kan aanroepen zonder
// de hele api module te importeren (dat mag niet vanuit client code)
import { getBreakingNews } from '@/lib/blog-api';

export async function getBreakingNewsAction() {
  return getBreakingNews();
}
