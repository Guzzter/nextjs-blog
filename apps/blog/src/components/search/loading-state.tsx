export function LoadingState() {
  return (
    <div className="animate-pulse gap-10 grid lg:grid-cols-3 sm:grid-cols-2">
      {[1, 2, 3].map((i) => (
        <div className="space-y-4" key={i}>
          <div className="aspect-video bg-[var(--color-rule)] opacity-10 rounded-sm" />
          <div className="bg-[var(--color-rule)] h-4 opacity-10 rounded-full w-1/4" />
          <div className="bg-[var(--color-rule)] h-6 opacity-10 rounded-full w-3/4" />
        </div>
      ))}
    </div>
  );
}

