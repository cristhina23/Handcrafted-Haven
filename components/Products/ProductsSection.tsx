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
  const [sortBy, setSortBy] = useState<SortOption>("manual");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
      setCategories(data);
    };

    getProducts();
    getCategories();
  }, []);

  // Ordenar productos
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "title-ascending": return a.title.localeCompare(b.title);
      case "title-descending": return b.title.localeCompare(a.title);
      case "price-ascending": return a.price - b.price;
      case "price-descending": return b.price - a.price;
      case "created-ascending": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "created-descending": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default: return 0;
    }
  });

  const handleCategorySelect = (cat: { _id: string; name: string }) => {
    console.log("Selected category:", cat.name);
  };

  const handlePriceChange = (range: { label: string; min?: number; max?: number }, checked: boolean) => {
    console.log("Selected price range:", range, checked);
  };

  return (
    <section className="space-y-6">

      <FilterSortGrid
        totalProducts={products.length}
        onGridChange={setGrid}
        onSortChange={setSortBy}
        onMobileFilterClick={() => setIsMobileFilterOpen(true)}
      />

      <ProductsContainer products={sortedProducts} grid={grid} />

      {/* Modal movile */}
     {isMobileFilterOpen && (
      <div className="fixed inset-0 z-50 flex">
        {/* Fondo negro detrás del sidebar */}
        <div
          className="absolute inset-0 bg-black/50 z-10"
          onClick={() => setIsMobileFilterOpen(false)}
        ></div>

        {/* Sidebar de filtros con z-index mayor */}
        <div className="ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out z-20">
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
            <ShopBy categories={categories} onSelect={handleCategorySelect} />
          )}

          {/* Filters */}
          <div className="mt-6">
            <FilterBy onChange={handlePriceChange} />
          </div>

          {/* Botón aplicar */}
          <button
            onClick={() => setIsMobileFilterOpen(false)}
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
