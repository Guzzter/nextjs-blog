interface ArticleContentProps {
  content: string;
  isSubscribed: boolean;
}

export function ArticleContent({ content, isSubscribed }: ArticleContentProps) {
  const paragraphs = content.split('\n\n');
  const displayParagraphs = isSubscribed ? paragraphs : paragraphs.slice(0, 2);

  return (
    <div className={`max-w-none prose prose-serif text-[var(--color-ink)] ${!isSubscribed ? 'paywall-fade mb-10' : ''}`}>
      {displayParagraphs.map((p, i) => (
        <p key={i} className="mb-6 leading-relaxed text-lg">
          {p}
        </p>
      ))}
    </div>
  );
}
