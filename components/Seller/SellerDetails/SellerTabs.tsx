"use client";

import { useState } from "react";
import ProductGrid from "./ProductGrid";
import { useEffect } from "react";

export default function SellerTabs({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("products");

  const [allReviews, setAllReviews] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setAllReviews(Array.isArray(data) ? data : []));
  }, []);

  const reviews = allReviews.filter((p: any) => p.id === sellerId);

  return (
    <div className="w-full mt-10 mb-20 px-4 md:px-8 mt-25">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        {["products", "about", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize pb-2 ${
              activeTab === tab
                ? "border-b-2 border-black font-semibold"
                : "opacity-60"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "products" && <ProductGrid sellerId={id} />}
        {activeTab === "about" && <p>About the seller...</p>}
        {activeTab === "reviews" && <p>Seller reviews will show here.</p>}
      </div>
    </div>
  );
}
