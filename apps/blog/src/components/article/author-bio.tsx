import Image from 'next/image';

interface AuthorBioProps {
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
}

export function AuthorBio({ author }: AuthorBioProps) {
  // ff checken of bio uberhaupt bestaat
  if (!author.bio) return null;

  return (
    <section className="border-t border-rule/10 mt-16 pt-10">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-rule/10 shrink-0 shadow-md">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif font-black italic text-xl text-[var(--color-ink)]">
            About {author.name}
          </h3>
          <p className="text-[var(--color-ink-muted)] leading-relaxed max-w-2xl italic">
            "{author.bio}"
          </p>
        </div>
      </div>
    </section>
  );
}
