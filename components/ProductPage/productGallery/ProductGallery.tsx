"use client";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex-1 relative bg-white py-9 rounded-xl shadow-sm border border-slate-200">
      {/* Imagen principal */}
      <div className="flex items-center justify-center">
         <div className="size-9 flex items-center justify-center bg-white p-2 rounded-full shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
        <button
        onClick={handlePrev}
        className="text-gray-600 hover:text-gray-800 text-2xl"
      >
        &#10094; 
      </button>
      </div>
        <Image
        src={images[currentIndex]}
        alt={`Product Image ${currentIndex}`}
        width={600}
        height={600}
        className="w-full h-96 object-contain rounded"
      />

     
      <div className=" size-9 flex items-center justify-center bg-white p-2 rounded-full shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
      <button
        onClick={handleNext}
        className="text-gray-600 hover:text-gray-800 text-2xl "
      >
        &#10095; 
      </button>
      </div>
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 items-center justify-center gap-2">
        {images.map((img, idx) => (
          <button key={idx} onClick={() => setCurrentIndex(idx)}>
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              width={100}
              height={100}
              className={`w-24 h-24 object-cover rounded border ${
                idx === currentIndex ? "border-slate-700" : "border-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
