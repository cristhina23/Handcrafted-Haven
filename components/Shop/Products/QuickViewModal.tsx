"use client";

import { useState } from "react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function QuickViewModal({ isOpen, onClose, product }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="
              relative 
              bg-white 
              rounded-lg 
              p-4 
              w-full 
              max-w-5xl 
              max-h-[90vh] 
              overflow-hidden
              flex flex-col
            "
          >
            {/* Cerrar */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
              onClick={onClose}
            >
              <X size={28} />
            </button>

            {/* Contenedor de imagen */}
            <div className="relative w-full flex-1 flex justify-center items-center bg-gray-100 rounded-lg">
  <div className="w-[500px] h-[500px] flex justify-center items-center relative">
    <Image
      src={product.images[currentIndex]}
      alt={`Image ${currentIndex + 1}`}
      fill
      className="object-cover rounded-lg"
    />
  </div>

  {/* Flechas */}
  <button
    onClick={prevImage}
    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/70"
  >
    <ChevronLeft size={28} />
  </button>
  <button
    onClick={nextImage}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 rounded-full p-2 hover:bg-white/70"
  >
    <ChevronRight size={28} />
  </button>
</div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
