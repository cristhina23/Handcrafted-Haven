'use client';
 
import { useEffect } from 'react';
import Image from 'next/image';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      <Image
        src="/images/error/error.webp"
        alt='error page'
        width={1032}
        height={1032}
        className='w-full min-h-130 relative hidden md:block'
      />
      <Image
        src="/images/error/error.webp"
        alt='error page'
        width={640}
        height={800}
        className='w-full h-full relative block md:hidden'
      />
      <div className='absolute text-center'>
      <h2 className="text-center text-(--brand-light) text-xl sm:text-3xl font-bold ">
        Oops! Something went wrong.
      </h2>
      <button
        className="mt-4 rounded-md bg-red-500 px-4 sm:px-6 py-2 text-sm sm:text-base text-(--brand-light) transition-colors hover:bg-red-400 "
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
      </div>
    </main>
  );
}