"use client";
import { useState } from "react";

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="relative w-full py-24 px-6 flex flex-col items-center">
      <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center opacity-70"></div>
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* TITLE */}
        <div className="bg-gray-50 shadow-lg rounded-xl px-16 py-4 mb-8 text-center">
        <h2 className="text-5xl font-bold text-[#6EBADD] mb-3">Contact Us</h2>
        <p className="text-black text-lg text-center">
          We want to hear your Feedback
        </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-sm">

          {sent && (
            <p className="text-center mb-4 text-green-600 font-semibold">
              Sent!
            </p>
          )}

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="text-sm text-gray-700">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6EBADD]"
                placeholder="Value"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Surname</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6EBADD]"
                placeholder="Value"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#6EBADD]"
                placeholder="Value"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-[#6EBADD]"
                placeholder="Value"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6EBADD] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* NEWSLETTER */}
        <section className="mt-24 w-full bg-gray-50 py-20 flex justify-center px-16 py-4 mb-8">
          <div className="max-w-md w-full text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#6EBADD]">
              Follow the latest news
            </h2>
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

      </div>
    </section>
  );
}
