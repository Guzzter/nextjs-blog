'use client';

export default function ErrorBoundary() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 w-full">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-bold mb-4 text-4xl">Server error</h1>
      </div>
    </div>
  );
}
