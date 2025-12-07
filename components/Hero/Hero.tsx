"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Slide data interface
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
  type: "hero" | "purpose" | "benefits";
  features?: string[];
  benefits?: {
    icon: string;
    title: string;
    description: string;
  }[];
}

// Slides data
const slides: Slide[] = [
  {
    id: 1,
    title: "Discover Unique Handcrafted Treasures",
    subtitle:
      "Connecting artisans with those who value meaningful, handmade creations.",
    backgroundImage: "/images/hero-slide-3.webp",
    ctaText: "Learn More",
    ctaLink: "/products",
    type: "hero",
  },
  {
    id: 2,
    title: "Our Purpose",
    subtitle:
      "Empowering artisans worldwide while preserving traditional crafts for future generations. We believe in fair trade, authentic craftsmanship, and building meaningful connections between creators and customers. Every purchase supports a family, preserves a tradition, and creates a ripple effect of positive change in communities around the globe. Join us in celebrating the beauty of human creativity and the stories behind every handmade piece.",
    backgroundImage: "/images/hero-slide-3.webp",
    ctaText: "Learn About Us",
    ctaLink: "/about",
    type: "purpose",
    features: [
      "Support Local Artisans Globally",
      "Preserve Traditional Crafts & Heritage",
      "100% Authentic Handmade Products",
      "Sustainable & Eco-Friendly Marketplace",
      "Fair Trade & Ethical Practices",
      "Direct Connection with Creators",
      "Cultural Heritage Preservation",
      "Community Building & Empowerment",
    ],
  },
  {
    id: 3,
    title: "Why Choose Handcrafted?",
    subtitle:
      "Discover the unique advantages of choosing authentic, handmade products over mass-produced alternatives.",
    backgroundImage: "/images/hero-slide-3.webp",
    ctaText: "Start Shopping",
    ctaLink: "/products",
    type: "benefits",
    benefits: [
      {
        icon: "✨",
        title: "One-of-a-Kind Pieces",
        description:
          "Each item is unique, with subtle variations that make it truly yours.",
      },
      {
        icon: "🎨",
        title: "Superior Craftsmanship",
        description:
          "Years of skill and tradition go into every handcrafted piece.",
      },
      {
        icon: "🌱",
        title: "Sustainable Choice",
        description:
          "Eco-friendly production with minimal environmental impact.",
      },
      {
        icon: "💝",
        title: "Meaningful Stories",
        description:
          "Every purchase connects you to the artisan's culture and heritage.",
      },
    ],
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
                className="inline-block bg-sky-300 hover:bg-sky-400 text-gray-900 font-bold 
                         py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                         transition-all duration-300 text-lg border-2 border-sky-300 hover:border-sky-400"
              >
                {currentSlideData.ctaText}
              </Link>
            </>
          ) : currentSlideData.type === "purpose" ? (
            // Purpose content (Slide 2)
            <>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h1>

              <h4 className="text-xs md:text-lg lg:text-xl text-white/90 mb-4 md:mb-8 drop-shadow-md max-w-4xl mx-auto px-2 md:px-4 leading-tight">
                {/* Mostrar texto más corto en móvil */}
                <span className="block md:hidden">
                  Empowering artisans worldwide while preserving traditional
                  crafts for future generations.
                </span>
                <span className="hidden md:block">
                  {currentSlideData.subtitle}
                </span>
              </h4>

              {/* Purpose features */}
              {currentSlideData.features && (
                <>
                  {/* Vista móvil: solo 4 features principales */}
                  <div className="grid grid-cols-1 gap-2 max-w-sm mx-auto mb-4 px-2 md:hidden">
                    {currentSlideData.features
                      .slice(0, 4)
                      .map((feature, index) => (
                        <div
                          key={index}
                          className="bg-white/90 rounded-lg p-2 shadow-md border border-gray-100 hover:shadow-lg transform hover:scale-102 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-sky-600 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-800 font-medium text-xs leading-tight">
                              {feature}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Vista desktop: todas las features */}
                  <div className="hidden md:grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8 px-4">
                    {currentSlideData.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-white/90 rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:scale-102"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 bg-sky-600 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-800 font-medium text-sm lg:text-base">
                            {feature}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Link
                href={currentSlideData.ctaLink}
                className="inline-block bg-sky-300 hover:bg-sky-400 text-gray-900 font-bold 
                         py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                         transition-all duration-300 text-lg border-2 border-sky-300 hover:border-sky-400"
              >
                {currentSlideData.ctaText}
              </Link>
            </>
          ) : (
            // Benefits content (Slide 3)
            <>
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 leading-tight drop-shadow-lg">
                {currentSlideData.title}
              </h1>

              <h4 className="text-xs md:text-lg lg:text-xl text-white/90 mb-4 md:mb-8 drop-shadow-md px-2 md:px-4 leading-tight">
                {/* Texto más corto en móvil */}
                <span className="block md:hidden">
                  Discover the unique advantages of choosing authentic, handmade
                  products.
                </span>
                <span className="hidden md:block">
                  {currentSlideData.subtitle}
                </span>
              </h4>

              {/* Benefits section */}
              {currentSlideData.benefits && (
                <>
                  {/* Vista móvil: solo 2 benefits principales */}
                  <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto mb-4 px-2 md:hidden">
                    {currentSlideData.benefits
                      .slice(0, 2)
                      .map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="bg-white/95 rounded-xl p-3 shadow-md border border-gray-50"
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-2">{benefit.icon}</div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-1">
                              {benefit.title}
                            </h3>
                            <p className="text-gray-600 leading-tight text-xs">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Vista desktop: todos los benefits */}
                  <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto mb-6 md:mb-8 px-4">
                    {currentSlideData.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="bg-white/95 rounded-xl p-4 md:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-102 border border-gray-50"
                      >
                        <div className="text-center">
                          <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-4">
                            {benefit.icon}
                          </div>
                          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 md:mb-3">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed text-xs md:text-sm lg:text-base">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Link
                href={currentSlideData.ctaLink}
                className="inline-block bg-sky-300 hover:bg-sky-400 text-gray-900 font-bold 
                         py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 
                         transition-all duration-300 text-lg border-2 border-sky-300 hover:border-sky-400"
              >
                {currentSlideData.ctaText}
              </Link>
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
