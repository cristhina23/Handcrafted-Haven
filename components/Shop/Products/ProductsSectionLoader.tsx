"use client";

import { useEffect, useState } from "react";
import ProductsSection from "./ProductsSection";
import ProductCardSkeleton from "./ProductCardSkeleton";

import { Product } from "@/types";

interface ProductsSectionLoaderProps {
  grid?: boolean;
  [key: string]: unknown;
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
    return <ProductCardSkeleton grid={props.grid} />;
  }

  return <ProductsSection {...props} products={products} />;
}
