"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGrid({ sellerId }: { sellerId: string }) {
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []));
  }, []);

  const products = allProducts.filter((p: any) => p.sellerId === sellerId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 w-full">
      {products.map((p) => (
        <div
          key={p._id}
          className="bg-white border border-slate-200 rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col items-center w-full min-w-0"
        >
          <Image
            src={Array.isArray(p.images) ? p.images[0] : p.images}
            alt={p.title}
            className="w-full h-32 sm:h-40 object-cover rounded-lg mb-2"
            width={200}
            height={200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 200px"
          />
          <h3 className="text-base font-bold text-slate-800 mb-1 text-center w-full break-words">
            {p.title}
          </h3>
          <p className="text-sm text-slate-900 font-semibold mb-1 text-center">
            ${p.price}
          </p>
          <p className="text-xs text-slate-600 text-center">⭐ {p.rating}</p>
        </div>
      ))}
    </div>
  );
}
