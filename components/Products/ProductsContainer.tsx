"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/types";

interface Props {
  products: Product[];
  grid: number;
}

export default function ProductsContainer({ products, grid }: Props) {
  return (
    <div
      className={`grid gap-6
        ${grid === 1 ? "grid-cols-1" : ""}
        ${grid === 2 ? "grid-cols-2" : ""}
        ${grid === 3 ? "grid-cols-3" : ""}
        ${grid === 4 ? "grid-cols-4" : ""}
      `}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} grid={grid} />
      ))}
    </div>
  );
}
