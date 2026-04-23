import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 w-full">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="font-bold mb-4 text-4xl">Page Not Found</h1>
        <p className="mb-4 text-gray-600">Sorry, but the page you are looking for does not exist.</p>
        <Link className="bg-gray-900 px-4 py-2 rounded text-white" href="/">
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
