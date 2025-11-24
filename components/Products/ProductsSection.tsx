"use client";

import { useState, useEffect } from "react";
import { FilterSortGrid } from "@/components/Products/FilteredSortGrid";
import ProductsContainer from "./ProductsContainer";
import { Product } from "@/types/";
import { SortOption } from "./DynamicSortSelector"; // exporta el tipo desde DynamicSortSelector

export default function ProductsSection() {
  const [grid, setGrid] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("manual");

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  // Productos ordenados
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "title-ascending":
        return a.title.localeCompare(b.title);
      case "title-descending":
        return b.title.localeCompare(a.title);
      case "price-ascending":
        return a.price - b.price;
      case "price-descending":
        return b.price - a.price;
      case "created-ascending":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "created-descending":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0; // manual o best-selling si lo quieres personalizar
    }
  });

  return (
    <section className="space-y-6">
      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={setGrid}
        onSortChange={setSortBy} // <-- nuevo prop
      />

      <ProductsContainer products={sortedProducts} grid={grid} />
    </section>
  );
}
