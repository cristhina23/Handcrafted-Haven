"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGrid({ sellerId }: { sellerId: string }) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []));

    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setAllReviews(Array.isArray(data) ? data : []));
  }, []);

  const products = allProducts.filter((p: any) => p.sellerId === sellerId);
  const reviews = allReviews.filter((p: any) => p.sellerId === sellerId);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((p) => (
        <div
          key={p._id}
          className="border rounded-lg p-2 shadow-sm hover:shadow-md transition"
        >
          <Image
            src={p.images}
            alt={p.title}
            className="w-full h-40 object-cover rounded"
            width={200}
            height={200}
          />

          <h3 className="text-sm mt-2 font-semibold">{p.title}</h3>
          <p className="text-xs text-gray-500">{p.price}</p>

          <p className="text-xs mt-1">⭐ {p.rating}</p>
        </div>
      ))}
    </div>
  );
}
