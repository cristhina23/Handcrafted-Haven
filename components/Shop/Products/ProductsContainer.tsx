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
      className={`md:p-12 grid gap-6
         grid-cols-1           
        ${grid === 2 ? "sm:grid-cols-2" : ""}
        ${grid === 3 ? "sm:grid-cols-3" : ""}
        ${grid === 4 ? "sm:grid-cols-4" : ""}
      `}
    >
      {products.map((product, index) => (
        <ProductCard key={`${product._id}-${index}`} product={product} grid={grid} />
      ))}
    </div>
  );
}
