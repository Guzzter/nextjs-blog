import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

interface ArticleContentProps {
  content: string;
  isSubscribed: boolean;
}

// rhype hl voor codeblkkn (moet nog configureren)
export function ArticleContent({ content, isSubscribed }: ArticleContentProps) {
  const paras = content.split('\n\n');
  const dsplyCntnt = isSubscribed ? content : paras.slice(0, 2).join('\n\n');

  return (
    <div className={`max-w-none prose prose-serif text-[var(--color-ink)] ${!isSubscribed ? 'paywall-fade mb-10' : ''}`}>
      <MDXRemote
        source={dsplyCntnt}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeHighlight as any],
          }
        }}
      />
    </div>
  );
}
