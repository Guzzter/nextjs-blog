export function SiteFooter() {
  return (
    <footer className="border-t mt-16 py-8">
      <div className="flex font-bold justify-between max-w-6xl mx-auto px-4 text-[0.6rem] text-gray-400 tracking-widest uppercase">
        <p>{process.env.NEXT_PUBLIC_SITE_NAME}</p>
        <p>&copy; 2025-{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
