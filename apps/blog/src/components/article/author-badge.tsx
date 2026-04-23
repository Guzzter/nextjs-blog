import Image from 'next/image';

interface AuthorBadgeProps {
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  className?: string;
  avatarSize?: number;
}

export function AuthorBadge({ author, date, className = '', avatarSize = 32 }: AuthorBadgeProps) {
  const pubDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative rounded-full overflow-hidden border border-rule/10 shadow-sm`} style={{ width: avatarSize, height: avatarSize }}>
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-[var(--color-ink)] text-sm leading-tight">{author.name}</span>
        <p className="font-bold text-[var(--color-ink-muted)] text-[0.65rem] uppercase tracking-wider mt-0.5">
          {pubDate}
        </p>
      </div>
    </div>
  );
}
