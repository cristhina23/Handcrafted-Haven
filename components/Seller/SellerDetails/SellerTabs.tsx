"use client";

import { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";

export default function SellerTabs({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("products");

  interface Review {
    user?: string;
    author?: string;
    rating?: number;
    comment?: string;
    text?: string;
  }
  interface Product {
    sellerId: string;
    reviews?: Review[];
    [key: string]: any;
  }
  interface Seller {
    bio?: string;
    shopName?: string;
    country?: string;
  }
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [seller, setSeller] = useState<Seller | null>(null);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setAllProducts(Array.isArray(data) ? data : []));
    fetch(`/api/seller/${id}`)
      .then((res) => res.json())
      .then((data) => setSeller(data.seller || null));
  }, [id]);

  // Filter products for this seller
  const sellerProducts = allProducts.filter((p) => p.sellerId === id);
  // Gather all reviews from seller's products
  const reviews: Review[] = sellerProducts.flatMap((p) => p.reviews || []);
  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum: number, r) => sum + (r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  // About section in English, auto-generated if missing
  let aboutText = "";
  if (seller) {
    aboutText =
      seller.bio && seller.bio.trim().length > 0
        ? seller.bio
        : `Welcome to ${seller.shopName}! We are based in ${
            seller.country || "an unknown location"
          } and specialize in handmade products. Our shop is dedicated to quality, creativity, and customer satisfaction. Discover our story and inspiration through our unique creations!`;
  } else {
    aboutText =
      "This seller has not provided a bio yet. Shop with confidence and discover their unique products!";
  }

  return (
    <div className="w-full mt-6 mb-10 px-2 sm:px-4 md:px-8">
      {/* Tabs */}
      <div className="flex gap-2 sm:gap-6 border-b-2 border-[var(--brand-light-blue)] pb-2 flex-wrap justify-center md:justify-start">
        {["products", "about", "reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize pb-2 transition-colors duration-200 ${
              activeTab === tab
                ? "border-b-4 border-[var(--brand-dark)] text-[var(--brand-dark)] font-bold"
                : "opacity-60 text-[var(--brand-dark)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="mt-4">
        {activeTab === "products" && <ProductGrid sellerId={id} />}
        {activeTab === "about" && (
          <div className="bg-white p-6 rounded-lg shadow text-slate-800">
            <h3 className="text-xl font-bold mb-2">About the Seller</h3>
            <p>{aboutText}</p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="bg-white p-6 rounded-lg shadow text-slate-800">
            <h3 className="text-xl font-bold mb-2">Product Reviews</h3>
            {avgRating && (
              <div className="mb-4 flex items-center gap-2">
                <span className="font-semibold">Average Rating:</span>
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(Number(avgRating)))}
                </span>
                <span className="text-slate-700">{avgRating} / 5</span>
              </div>
            )}
            <ul className="space-y-4">
              {reviews.length === 0 ? (
                <li className="text-slate-600">
                  No reviews yet for this seller&apos;s products.
                </li>
              ) : (
                reviews.map((r, idx: number) => (
                  <li key={idx} className="border-b pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">
                        {r.user || r.author || "Anonymous"}
                      </span>
                      <span className="text-yellow-500">
                        {"★".repeat(r.rating || 0)}
                      </span>
                    </div>
                    <p className="text-slate-700">
                      {r.comment || r.text || ""}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
