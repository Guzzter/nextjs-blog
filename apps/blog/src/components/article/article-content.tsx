import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface ArticleContentProps {
  content: string;
  isSubscribed: boolean;
}

// Rehype highlight syntax highlight van code blokken

export function ArticleContent({ content, isSubscribed }: ArticleContentProps) {
  const paragraphs = content.split('\n\n');
  const displayContent = isSubscribed ? content : paragraphs.slice(0, 2).join('\n\n');

  return (
    <div className={`max-w-none prose prose-serif text-[var(--color-ink)] ${!isSubscribed ? 'paywall-fade mb-10' : ''}`}>
      <MDXRemote
        source={displayContent}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight as any],
          }
        }}
      />
    </div>
  );
}
