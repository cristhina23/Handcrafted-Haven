"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Variant } from "@/types";
import Image from "next/image";
import DropdownSelect from "../DropdownSelect";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: number;
    images: string[];
    variants?: Variant[];
    shippingMethods?: string[];
    quantity?: number;
    dimensions?: string
  };
  onAddToCart: (data: {
    
    variants: {
      size: string | null;
      color: string | null;
      material: string | null;
    };
    shippingMethod: string;
    dimensions: string | null;
    quantity: number;
  }) => void;
}

export default function AddToCartModal({
  isOpen,
  onClose,
  product,

  onAddToCart,
}: Props) {
  const [qty, setQty] = useState(1);

  // Extract variant types
  const sizes = product.variants?.map((v) => v.size).filter(Boolean) as string[];
  const colors = product.variants?.map((v) => v.color).filter(Boolean) as string[];
  const materials = product.variants?.map((v) => v.material).filter(Boolean) as string[];

  const [selected, setSelected] = useState({
    size: sizes?.[0] || null,
    color: colors?.[0] || null,
    material: materials?.[0] || null,
  });

  const shippingDefault = product.shippingMethods?.[0] || "";
  const [selectedShipping, setSelectedShipping] = useState(shippingDefault);
  

  const handleConfirm = () => {
    onAddToCart({
       dimensions: product.dimensions || null,
      variants: selected,   
      shippingMethod: selectedShipping,
      quantity: qty,
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999]">
          {/* Overlay */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full md:w-[320px] xl:w-[360px] bg-white shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { type: "spring", stiffness: 120, damping: 16 } }}
            exit={{ x: "100%" }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-slate-900">Add to Cart</h2>
              <button onClick={onClose} className="text-xl">✕</button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto pb-28">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  alt={product.title}
                  width={64}
                  height={64}
                  src={product.images[0]}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium text-slate-900" >{product.title}</p>
                  <p className="text-slate-700 text-md">${product.price}</p>
                </div>
              </div>

              <div>
                <p className="font-medium mb-1 text-slate-900">Dimensions</p>
                <p className="text-slate-700 mb-2">
                {product.dimensions}
              </p>
              </div>

              {/* SIZE */}
              {sizes.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium mb-1 text-slate-900">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelected({ ...selected, size: s })}
                        className={`px-3 py-1 border rounded-lg ${
                          selected.size === s ? "bg-black text-white" : "bg-gray-100"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* COLOR */}
              {colors.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium mb-1 text-slate-900">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelected({ ...selected, color: c })}
                        className={`px-3 py-1 border rounded-lg ${
                          selected.color === c ? "bg-black text-white" : "bg-gray-100"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MATERIAL */}
              {materials.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium mb-1 text-slate-900">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelected({ ...selected, material: m })}
                        className={`px-3 py-1 border rounded-lg ${
                          selected.material === m ? "bg-black text-white" : "bg-gray-100"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SHIPPING */}
              <div className="mb-4">
                <p className="font-medium mb-1 text-slate-900">Shipping</p>
                <DropdownSelect
                    options={(product.shippingMethods ?? []).map((m) => ({
                      label: m,
                      value: m,
                    }))}
                    value={selectedShipping}
                    onChange={(value) => setSelectedShipping(value)}
                    widthClass="w-full" 
                  />
              </div>

              {/* QUANTITY */}
              <div className="mb-18">
                <p className="font-medium mb- text-slate-900">Quantity</p>
                <input
                  type="number"
                  min={1}
                  max={product.quantity || 99}
                  value={qty}
                  onChange={(e) => setQty(parseInt(e.target.value))}
                  className="border rounded-lg w-full p-2"
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-4 border-t bg-white absolute bottom-0 right-0 w-full flex flex-col gap-4">
              <button
                onClick={handleConfirm}
                className="w-full py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition hover:shadow-xl hover:scale-[1.03] transition-scale duration-200 ease-out"
              >
                Add to Cart
              </button>
              <button
                onClick={handleConfirm}
                className="w-full py-2 border-4 rounded-lg border-slate-800  text-slate-800 font-semibold  shadow-md hover:bg-slate-800 hover:text-white hover:shadow-xl hover:scale-[1.03] transition-scale duration-200 ease-out"
              >
                Pay Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
