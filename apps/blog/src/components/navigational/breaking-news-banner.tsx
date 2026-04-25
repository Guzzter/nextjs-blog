'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBreakingNewsAction } from '@/app/actions/breaking-news';
import type { BlogPost } from '@/lib/blog-api';

export function BreakingNewsBanner() {
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let mounted = true;
    
    async function loadNews() {
      try {
        const news = await getBreakingNewsAction();
        if (mounted) {
          setPost(news);
        }
      } catch (e) {
        // Handle error silently
      }
    }
    
    // Initial load
    loadNews();
    
    // Poll every 10 seconds to make it truly dynamic
    const interval = setInterval(loadNews, 10000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!post) return null;

  return (
    <div
      className="bg-[var(--color-breaking)] border-[var(--color-rule)] border-b text-white"
      id="breaking-news-banner"
    >
      <Link
        className="flex gap-3 items-center max-w-6xl mx-auto overflow-hidden px-4 py-2.5 sm:px-6 group"
        href={`/articles/${post.slug}`}
      >
        <span className="animate-pulse bg-white/20 font-black px-2 py-0.5 rounded-sm shrink-0 text-[0.65rem] tracking-widest uppercase">
          Breaking
        </span>
        <p className="font-medium text-sm truncate group-hover:underline">
          {post.title}
        </p>
      </Link>
    </div>
  );
}
