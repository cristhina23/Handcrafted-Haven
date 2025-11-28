"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Slide data interface (Thx learning tutorials :D) - I'll delete comments later, don't worry guys haha.
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  type: "hero" | "product";
  product?: {
    id: string;
    name: string;
    price: number;
    image: string;
    link: string;
  };
}

// Slides data
const slides: Slide[] = [
  {
    id: 1,
    title: "Discover Unique Handcrafted Treasures",
    subtitle:
      "Connecting artisans with those who value meaningful, handmade creations.",
    backgroundImage: "/images/hero-slide-1.webp",
    ctaText: "Learn More",
    ctaLink: "/products",
    type: "hero",
  },
  {
    id: 2,
    title: "Top Products",
    subtitle: "Discover our most popular handcrafted items.",
    backgroundImage: "/images/hero-slide-2.webp",
    ctaText: "Shop Now",
    ctaLink: "/products",
    type: "product",
    product: {
      id: "1",
      name: "Artisan Clay Pottery Set",
      price: 89.99,
      image: "/images/hero-slide-2.webp", // Placeholder - usar imagen del slide por ahora
      link: "/products/artisan-clay-pottery-set",
    },
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play - changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]); // Reset timer when currentSlide changes

  // Manual slide change (resets timer)
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Background images with smooth transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.backgroundImage}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Slide content */}
          {currentSlideData.type === "hero" ? (
            // Hero content (Slide 1)
            <>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h1>

              <h4 className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {currentSlideData.subtitle}
              </h4>

              <Link
                href={currentSlideData.ctaLink}
                className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold 
                         py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                         transition-all duration-300 text-lg"
              >
                {currentSlideData.ctaText}
              </Link>
            </>
          ) : (
            // Product content (Slide 2)
            <>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h1>

              <h4 className="text-lg md:text-xl text-white/90 mb-12 drop-shadow-md">
                {currentSlideData.subtitle}
              </h4>

              {/* Product card */}
              {currentSlideData.product && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 max-w-sm mx-auto shadow-xl">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={currentSlideData.product.image}
                      alt={currentSlideData.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentSlideData.product.name}
                  </h3>

                  <p className="text-2xl font-bold text-sky-600 mb-4">
                    ${currentSlideData.product.price}
                  </p>

                  <Link
                    href={currentSlideData.product.link}
                    className="w-full block bg-sky-600 hover:bg-sky-700 text-white font-semibold 
                             py-3 px-6 rounded-lg transition-all duration-300 text-center"
                  >
                    Add to Cart
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Slide indicators (dots) :v */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide
                ? "bg-white shadow-lg"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
