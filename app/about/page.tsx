import Image from "next/image";
import { CarouselSpacing } from "@/components/HomeSections/carousel";


export default function AboutUsPage() {
  return (
    <main className="w-full flex flex-col items-center bg-white text-gray-800">
      {/* HERO SECTION */}
      <section className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center bg-black">
        <Image
          src="/images/hero-mission.jpeg"
          alt="Potter working clay"
          fill
          className="object-cover opacity-70"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-[#6EBADD]">Our Mission</h1>
          <p className="text-lg md:text-xl mt-2">Real art. Real people. Real value.</p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl px-6 py-20 mx-auto">
        <h2 className="sr-only">About Us</h2>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-gray-700">
            <h3 className="text-2xl font-semibold text-[#6EBADD]">We gave them voice, they just need you to listen</h3>
            <p>
              At our core, we aim to uplift the hands and hearts behind every handmade piece.
              Every product you see here carries the story, skill, and soul of real artists—people who
              create not just for income, but from identity, purpose, and tradition.
            </p>
            <p>
              When you support their work, you support communities, families, and cultural histories
              passed down through generations. If you're here, you're already part of that mission.
            </p>
          </div>

          <div>
            <Image
              src="/images/about-group.jpg"
              alt="Artisan community group photo"
              width={700}
              height={500}
              className="rounded-xl shadow"
            />
          </div>
        </div>
      </section>

      {/* ARTISTS SECTION */}
      <section className="w-full bg-gray-50 py-20 px-6 text-center">
  <h2 className="text-5xl font-semibold text-[#6EBADD] mb-16">
    Get to know our Artists!
  </h2>

  <CarouselSpacing />
</section>

      {/* BLOG TEASER */}
      <section className="relative w-full h-[320px] md:h-[420px] flex items-center justify-center mt-10">
        <Image
          src="/images/pottery-hands.jpg"
          alt="Hands shaping clay on wheel"
          fill
          className="object-cover opacity-90"
        />
        <div className="relative z-10 text-center text-white px-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#6EBADD]">Each piece has its history</h2>
          <a
            href="/blog"
            className="mt-6 inline-block bg-[#6EBADD] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Read Our Blog
          </a>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="w-full bg-white py-20 px-6 flex justify-center">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4 text-[#6EBADD]">Follow the latest news</h2>
          <p className="text-gray-600 mb-6">With our daily newsletter</p>

          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#6EBADD] text-white rounded-lg hover:bg-gray-800 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
