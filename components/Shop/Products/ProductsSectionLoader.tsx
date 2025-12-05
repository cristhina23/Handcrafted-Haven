"use client";

import { useEffect, useState } from "react";
import ProductsSection from "./ProductsSection";
import ProductCardSkeleton from "./ProductCardSkeleton";

import { Product } from "@/types";
import { SortOption } from "./DynamicSortSelector";

interface ProductsSectionLoaderProps {
  grid: number;
  sortBy: SortOption;
  onGridChange: (value: number) => void;
  onSortChange: (value: SortOption) => void;
  onOpenMobileFilter: () => void;
}

export default function ProductsSectionLoader(
  props: ProductsSectionLoaderProps
) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !products) {
    return <ProductCardSkeleton />;
  }

  return <ProductsSection {...props} products={products} loading={loading} />;
}
