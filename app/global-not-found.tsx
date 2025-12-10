// Import global styles and fonts
import './globals.css'
import { Merriweather } from 'next/font/google'
import type { Metadata } from 'next'
 
const merriweather = Merriweather({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en" className={merriweather.className}>
          <body>
              <main className='w-full min-h-150 flex flex-col justify-center items-center bg-(--brand-pale)'>
              <div className='flex gap-3 text-center font-semibold mb-3'>
                  <h1 className='border-r-2 border-black text-2xl pr-3'>
                    404
                  </h1>
                  <p>
                    Page Not Found
                  </p>
                </div>
                <p>This page does not exist.</p>
            </main>
      </body>
    </html>
  )
}