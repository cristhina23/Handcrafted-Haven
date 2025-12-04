"use client";

import ProductsContainer from "./ProductsContainer";
import { Product } from "@/types/";
import { SortOption } from "./DynamicSortSelector";
import { FilterSortGrid } from "@/components/Shop/Products/FilteredSortGrid";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
  grid: number;
  sortBy: SortOption;
  onGridChange: (value: number) => void;
  onSortChange: (value: SortOption) => void;
  onOpenMobileFilter: () => void;
  loading?: boolean;
}

export default function ProductsSection({
  products,
  grid,
  sortBy,
  onGridChange,
  onSortChange,
  onOpenMobileFilter,
  loading,
}: Props) {
  // Ordenar productos
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
        return 0;
    }
  });

  // ⛔ AQUI estaba tu error
  if (loading) {
    return (
      <section className="space-y-6">
        <FilterSortGrid
          totalProducts={0}               // o products.length si prefieres
          onGridChange={onGridChange}
          onSortChange={onSortChange}
          onMobileFilterClick={onOpenMobileFilter}
        />

        <div
          className={`grid gap-6 mt-4
            grid-cols-1
            ${grid === 2 ? "sm:grid-cols-2" : ""}
            ${grid === 3 ? "sm:grid-cols-3" : ""}
            ${grid === 4 ? "sm:grid-cols-4" : ""}
          `}
        >
          {Array.from({ length: grid * 2 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={onGridChange}
        onSortChange={onSortChange}
        onMobileFilterClick={onOpenMobileFilter}
      />

      <ProductsContainer products={sortedProducts} grid={grid} />
    </section>
  );
}
