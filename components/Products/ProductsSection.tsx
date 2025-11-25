"use client";

import { useState, useEffect } from "react";
import { FilterSortGrid } from "@/components/Products/FilteredSortGrid";
import ProductsContainer from "./ProductsContainer";
import { Product } from "@/types/";
import { SortOption } from "./DynamicSortSelector";
import ShopBy from "@/components/Sidebar/ShopBy";
import FilterBy from "@/components/Sidebar/FilterBy";

export default function ProductsSection() {
  const [grid, setGrid] = useState(3);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    { min?: number; max?: number }[]
  >([]);
  const [sortBy, setSortBy] = useState<SortOption>("manual");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtros temporales para el modal
  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [tempPriceRanges, setTempPriceRanges] = useState<{ min?: number; max?: number }[]>([]);

  // Cargar productos y categorías
  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
    };

    const getCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : data.categories);
    };

    getProducts();
    getCategories();
  }, []);

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

  // Aplicar filtros seleccionados
  const filteredProducts = sortedProducts.filter((product) => {
    // Filtrar por categoría
    const categoryMatch = !selectedCategory || product.categoryId === selectedCategory;

    // Filtrar por precio
    const priceMatch =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some(
        (range) =>
          (!range.min || product.price >= range.min) &&
          (!range.max || product.price <= range.max)
      );

    return categoryMatch && priceMatch;
  });

  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedPriceRanges(tempPriceRanges);
    setIsMobileFilterOpen(false);
  };

  return (
    <section className="space-y-6">
      {/* Filter + Sort + Mobile icon */}
      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={setGrid}
        onSortChange={setSortBy}
        onMobileFilterClick={() => {
          setTempCategory(selectedCategory);
          setTempPriceRanges(selectedPriceRanges);
          setIsMobileFilterOpen(true);
        }}
      />

      {/* Products */}
      <ProductsContainer products={filteredProducts} grid={grid} />

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50">
          {/* Fondo negro */}
          <div
            className="absolute inset-0 bg-black/50 z-10"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Sidebar de filtros */}
          <div className="fixed right-0 top-0 h-full w-full max-w-xs bg-white p-6 overflow-y-auto z-20 transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-slate-700 text-lg font-bold"
              >
                X
              </button>
            </div>

            {/* Categorías */}
            {categories.length > 0 && (
              <ShopBy
                categories={categories}
                onSelect={(cat) => setTempCategory(cat._id)}
              />
            )}

            {/* Filtros de precio */}
            <div className="mt-6">
              <FilterBy
                onChange={(range, checked) => {
                  if (checked) {
                    setTempPriceRanges([...tempPriceRanges, { min: range.min, max: range.max }]);
                  } else {
                    setTempPriceRanges(
                      tempPriceRanges.filter(
                        (r) => r.min !== range.min || r.max !== range.max
                      )
                    );
                  }
                }}
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApplyFilters}
              className="mt-6 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
