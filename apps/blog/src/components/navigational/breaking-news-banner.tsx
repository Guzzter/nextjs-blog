export async function BreakingNewsBanner() {
  return (
    <div
      className="bg-[var(--color-breaking)] border-[var(--color-rule)] border-b text-white"
      id="breaking-news-banner"
    >
      <div className="flex gap-3 items-center max-w-6xl mx-auto overflow-hidden px-4 py-2.5 sm:px-6">
        <span className="bg-white/20 font-black px-2 py-0.5 rounded-sm shrink-0 text-[0.65rem] tracking-widest uppercase">
          Breaking
        </span>
        <p className="font-medium text-sm truncate">TODO article title here</p>
      </div>
    </div>
  );
}
