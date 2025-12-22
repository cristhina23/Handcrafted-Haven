"use client";

import { useEffect, useState } from "react";
import ProductsContainer from "@/components/Shop/Products/ProductsContainer";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/all-products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  if (!products || products.length === 0)
    return <p className="text-center mt-10">No products available.</p>;

  return (
    <section className="py-12 px-4 md:px-8 bg-white dark:bg-slate-900">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Featured Products
      </h2>

      
      <ProductsContainer products={products} grid={4} />

      <div className="py-12 flex justify-center items-center">
        <Button className="bg-slate-900">View All</Button>
      </div>
    </section>
  );
};

export default ProductsSection;
