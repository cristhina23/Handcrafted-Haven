/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import ProductInfo from "./productDescription/ProductInfo";
import ProductGallery from "./productGallery/ProductGallery";
import ProductReviews from "./ProductReviews";
import PopularProducts from "./PopularProducts";
import { Product } from "@/types";
import ProductDescription from "./ProductDescription";

interface Props {
  productId: string;
}

export default function ProductPageContainer({ productId }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        setLoading(true);

        const res = await fetch(`/api/products/${productId}`, { cache: "no-store" });
        const data = await res.json();
        console.log(data);

        if (isCancelled) return;

        // Aquí guardas TODO lo que tu UI usa
        setProduct(data.product);
        setSeller(data.seller);
        setCategory(data.category);
        setReviews(data.reviews);

      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { isCancelled = true };
  }, [productId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-0 md:p-9 flex flex-col gap-10 ">
      {/* Gallery + Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <ProductGallery images={product.images} />
        <ProductInfo
          title={product.title}
          description={product.description}
          price={product.price}
          rating={product.rating}
          ratingCount={product.ratingCount}
          location={product.country}
          seller={seller?.shopName ?? "N/A"}
          category={category?.name ?? "N/A"}
          stock={product.quantity}
          colors={product.variants?.map((v) => v.color).filter((c): c is string => Boolean(c)) || []}
          dimensions={product.dimensions}
          onAddToCart={() => setModalOpen(true)}
        />
      </div>

      <ProductDescription description={product.description} />

      {/* <ProductReviews reviews={reviews} /> */}

      <PopularProducts grid={3} />
    </div>
  );
}
