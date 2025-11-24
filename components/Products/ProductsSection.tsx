"use client";

import { useState, useEffect } from "react";
import { FilterSortGrid } from "@/components/Products/FilteredSortGrid";
import ProductsContainer from "./ProductsContainer";
import { Product } from "@/types/";

export default function ProductsSection() {
  const [grid, setGrid] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  return (
    <section className="space-y-6">
      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={setGrid}
      />

      <ProductsContainer products={products} grid={grid} />
    </section>
  );
}
