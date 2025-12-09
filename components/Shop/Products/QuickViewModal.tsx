"use client";

import { useState } from "react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import DropdownSelect from "@/components/DropdownSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function QuickViewModal({ isOpen, onClose, product }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const { isSignedIn } = useUser();

  // Extract variant types
  const sizes = product.variants
    ?.map((v) => v.size)
    .filter(Boolean) as string[];
  const colors = product.variants
    ?.map((v) => v.color)
    .filter(Boolean) as string[];
  const materials = product.variants
    ?.map((v) => v.material)
    .filter(Boolean) as string[];

  const [selected, setSelected] = useState({
    size: sizes?.[0] || null,
    color: colors?.[0] || null,
    material: materials?.[0] || null,
  });

  const shippingDefault = product.shippingMethods?.[0] || "";
  const [selectedShipping, setSelectedShipping] = useState(shippingDefault);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      productName: product.title,
      productImage: product.images[0],
      price: product.price,
      sellerId: product.sellerId,
      sellerName: product.sellerName || "Unknown Seller",
      quantity: qty,
      variants: selected,
      dimensions: product.dimensions || null,
      shippingMethod: selectedShipping,
    });
    onClose();
  };

  const handlePayNow = () => {
    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/checkout");
      return;
    }

    addToCart(
      {
        productId: product._id,
        productName: product.title,
        productImage: product.images[0],
        price: product.price,
        sellerId: product.sellerId,
        sellerName: product.sellerName || "Unknown Seller",
        quantity: qty,
        variants: selected,
        dimensions: product.dimensions || null,
        shippingMethod: selectedShipping,
      },
      false
    );

    router.push("/checkout");
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
              p-6 
              w-full 
              max-w-6xl 
              max-h-[90vh] 
              overflow-y-auto
              flex gap-6
            "
          >
            {/* Cerrar */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-50"
              onClick={onClose}
            >
              <X size={28} />
            </button>

            {/* Lado izquierdo - Imagen */}
            <div className="w-1/2 flex-shrink-0">
              <div className="relative w-full h-[500px] flex justify-center items-center bg-gray-100 rounded-lg">
                <Image
                  src={product.images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />

                {/* Flechas */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Lado derecho - Información del producto y variantes */}
            <div className="w-1/2 flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-slate-600 text-sm mb-2">
                  by {product.sellerName || "Unknown Seller"}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  ${product.price}
                </p>
              </div>

              <p className="text-slate-700 text-sm line-clamp-3">
                {product.description}
              </p>

              {product.dimensions && (
                <div>
                  <p className="font-medium mb-1 text-slate-900">Dimensions</p>
                  <p className="text-slate-700 text-sm">{product.dimensions}</p>
                </div>
              )}

              {/* COLOR */}
              {colors.length > 0 && (
                <div>
                  <p className="font-medium mb-2 text-slate-900">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelected({ ...selected, color: c })}
                        className={`px-4 py-2 border rounded-lg transition ${
                          selected.color === c
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-900 border-gray-300 hover:border-slate-800"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SIZE */}
              {sizes.length > 0 && (
                <div>
                  <p className="font-medium mb-2 text-slate-900">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelected({ ...selected, size: s })}
                        className={`px-4 py-2 border rounded-lg transition ${
                          selected.size === s
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-900 border-gray-300 hover:border-slate-800"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MATERIAL */}
              {materials.length > 0 && (
                <div>
                  <p className="font-medium mb-2 text-slate-900">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() =>
                          setSelected({ ...selected, material: m })
                        }
                        className={`px-4 py-2 border rounded-lg transition ${
                          selected.material === m
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-slate-900 border-gray-300 hover:border-slate-800"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SHIPPING */}
              {product.shippingMethods &&
                product.shippingMethods.length > 0 && (
                  <div>
                    <p className="font-medium mb-2 text-slate-900">
                      Shipping Method
                    </p>
                    <DropdownSelect
                      options={product.shippingMethods.map((m) => ({
                        label: m,
                        value: m,
                      }))}
                      value={selectedShipping}
                      onChange={(value) => setSelectedShipping(value)}
                      widthClass="w-full"
                    />
                  </div>
                )}

              {/* QUANTITY */}
              <div>
                <p className="font-medium mb-2 text-slate-900">Quantity</p>
                <input
                  type="number"
                  min={1}
                  max={product.quantity || 99}
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                  className="border border-gray-300 rounded-lg w-24 p-2 text-slate-900"
                />
              </div>

              {/* BOTONES */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition hover:shadow-xl"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handlePayNow}
                  className="w-full py-3 border-2 border-slate-800 text-slate-800 rounded-lg font-semibold hover:bg-slate-800 hover:text-white transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
