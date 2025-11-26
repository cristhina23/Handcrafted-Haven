"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Shop/Sidebar/Sidebar";
import { PriceRange } from "@/components/Shop/Sidebar/FilterBy";
import ProductsSection from "@/components/Shop/Products/ProductsSection";
import { Product } from "@/types";
import { SortOption } from "@/components/Shop/Products/DynamicSortSelector";

export default function ShopView() {
  const [grid, setGrid] = useState(3);
  const [sortBy, setSortBy] = useState<SortOption>("manual");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  // ============================
  // FILTER STATES (LOAD FROM LOCALSTORAGE ON INIT)
  // ============================
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("shopFilters");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.category || null;
      }
    } catch (error) {
      console.error("Error loading category from localStorage:", error);
    }
    return null;
  });

  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("shopFilters");
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.price || null;
      }
    } catch (error) {
      console.error("Error loading price from localStorage:", error);
    }
    return null;
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ============================
  // FETCH PRODUCTS & CATEGORIES
  // ============================
  useEffect(() => {
   const fetchData = async () => {
      const resProducts = await fetch("/api/products");
      const dataProducts = await resProducts.json();

      const resCategories = await fetch("/api/categories");
      const dataCategories = await resCategories.json();

      setProducts(Array.isArray(dataProducts) ? dataProducts : []);
      setCategories(Array.isArray(dataCategories) ? dataCategories : []);

      setLoading(false); 
    };

    fetchData();
  }, []);

  // ============================
  // SAVE FILTERS TO LOCALSTORAGE
  // ============================
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const filters = {
        category: selectedCategory,
        price: selectedPrice,
      };
      localStorage.setItem("shopFilters", JSON.stringify(filters));

    } catch (error) {
      console.error("Error saving filters to localStorage:", error);
    }
  }, [selectedCategory, selectedPrice]);

  // ============================
  // FILTERED PRODUCTS
  // ============================
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    const matchesPrice =
      !selectedPrice ||
      ((selectedPrice.min !== undefined ? product.price >= selectedPrice.min : true) &&
        (selectedPrice.max !== undefined ? product.price <= selectedPrice.max : true));

    return matchesCategory && matchesPrice;
  });

  return (
    <div className="flex gap-8">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:block w-64">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          selectedPrice={selectedPrice}
          onPriceSelect={setSelectedPrice}
        />
      </aside>

      {/* MOBILE FILTER BUTTON */}
      <div className="fixed bottom-4 right-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Filters
        </button>
      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">
        <ProductsSection
          products={filteredProducts}
          loading={loading} 
          grid={grid}
          sortBy={sortBy}
          onGridChange={setGrid}
          onSortChange={setSortBy}
          onOpenMobileFilter={() => setIsMobileFilterOpen(true)}
        />
      </div>

      {/* MOBILE FILTER MODAL */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-64 h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Sidebar Filters */}
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              selectedPrice={selectedPrice}
              onPriceSelect={setSelectedPrice}
              onApply={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
