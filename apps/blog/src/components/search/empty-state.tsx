export function EmptyState() {
  return (
    <div className="border-[var(--color-rule)]/10 border-t py-24 text-center">
      <div className="bg-[var(--cerulean)]/5 flex h-16 items-center justify-center mb-6 mx-auto rounded-full text-[var(--cerulean)] w-16">
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      </div>
      <h3 className="font-black font-serif italic mb-2 text-[var(--yale-blue)] text-2xl">
        No results found
      </h3>
      <p className="max-w-xs mx-auto text-[var(--color-ink-muted)] text-sm">
        Try adjusting your search terms or selecting a different category to find what you're looking for in our archive.
      </p>
    </div>
  );
}
