"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSection() {
  const [error, setError] = useState("");

  const validateEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");
    // Aquí puedes mandar el email al backend si quieres
    console.log("Subscribed:", email);
  };

  return (
    <section
      className="
        newsletter relative bg-fixed bg-cover bg-bottom 
        text-white flex items-center justify-center px-6 py-20
      "
      style={{
        backgroundImage: "url('/sellerBanner.jpg')", 
      }}
    >
      <div
        className="
          bg-black/60 p-10 rounded-xl max-w-4xl w-full
          grid grid-cols-1 md:grid-cols-2 gap-10
        "
      >
        {/* TEXT */}
        <div>
          <h3 className="text-xl text-amber-400 font-semibold">Your craft can transform your life.</h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            We are here to help you make it happen.
          </h2>
          <p className="mt-3 text-white/90">
            Receive exclusive offers, tips, and updates straight to your inbox.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={validateEmail}
          className="flex flex-col gap-4 justify-center"
        >
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="
              p-4 rounded-lg text-slate-900 text-lg outline-none 
            "
            required
          />

          <button
            className="
              bg-amber-500 hover:bg-amber-600 transition text-white 
              py-3 rounded-lg font-semibold
            "
            aria-label="Subscribe to our newsletter"
          >
            SUBSCRIBE
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
      </div>
    </section>
  );
}
