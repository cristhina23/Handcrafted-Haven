"use client";
import { useEffect, useState } from "react";
import ProductsContainer from "@/components/Shop/Products/ProductsContainer";
import { Product } from "@/types";

export default function SellerProductsList({ sellerId }: { sellerId: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const validProducts = Array.isArray(data) ? data : [];
        const filtered = validProducts.filter(
          (p: Product) => p.sellerId === sellerId
        );
        setProducts(filtered);
        setLoading(false);
      });
  }, [sellerId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="md:p-12" >
      <ProductsContainer products={products} grid={3} />
    </div>
  );
}
