import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types";
import Link from "next/link";

interface Props {
  product: Product;
  grid: number;
}

export default function ProductCard({ product, grid }: Props) {
  const isHorizontal = grid === 1;
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
     <Link href={`/shop/product/${product._id}`}>
      <motion.div
        className={`
          bg-white p-4 rounded-xl shadow 
          transition border hover:shadow-lg cursor-pointer
          ${isHorizontal ? "flex gap-4 items-center" : "flex flex-col"}
        `}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* IMG */}
        <div
          className={`
            relative rounded-lg overflow-hidden
            ${isHorizontal ? "w-[40%] h-40" : "w-full h-64"}
          `}
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* TEXT */}
        <div className={`${isHorizontal ? "w-[60%]" : "w-full mt-3"}`}>
          <h2 className="text-lg font-semibold text-slate-800">{product.title}</h2>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-3 font-bold text-slate-900">
            ${product.price}
          </div>
        </div>

        <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="absolute top-0 right-0 h-5/12 w-12 bg-white/30 backdrop-blur-sm flex flex-col justify-center items-center gap-3 p-2 rounded-l-lg"
              >
                <Heart className="text-slate-700 cursor-pointer hover:text-red-500" size={20} />
                <Eye
                  className="text-gray-700 cursor-pointer hover:text-blue-500"
                  size={20}
                  onClick={() => setShowModal(true)}
                />
                <ShoppingCart className="text-gray-700 cursor-pointer hover:text-blue-500" size={20} />
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>
     </Link>

     {/* Modal de QuickView */}
      <QuickViewModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </>
  );
}
