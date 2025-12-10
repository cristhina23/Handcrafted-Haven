import Link from 'next/link';
 
export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-merriweather font-semibold">404 Not Found</h2>
      <p>Could not find the requested seller</p>
      <Link
        href="/seller/"
        className="mt-4 rounded-md bg-indigo-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  );
}