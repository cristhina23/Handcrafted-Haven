"use client";

import ProductsContainer from "./ProductsContainer";
import { Product } from "@/types/";
import { SortOption } from "./DynamicSortSelector";
import { FilterSortGrid } from "@/components/Shop/Products/FilteredSortGrid";

interface Props {
  products: Product[];
  grid: number;
  sortBy: SortOption;
  onGridChange: (value: number) => void;
  onSortChange: (value: SortOption) => void;
  onOpenMobileFilter: () => void;
}

export default function ProductsSection({
  products,
  grid,
  sortBy,
  onGridChange,
  onSortChange,
  onOpenMobileFilter,
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

  return (
    <section className="space-y-6">
      {/* Filter + Sort + Mobile icon */}
      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={onGridChange}
        onSortChange={onSortChange}
        onMobileFilterClick={onOpenMobileFilter}
      />

      {/* Products */}
      <ProductsContainer products={sortedProducts} grid={grid} />
    </section>
  );
}
