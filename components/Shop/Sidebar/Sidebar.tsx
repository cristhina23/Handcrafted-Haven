"use client";

import { useState } from "react";
import ShopBy from "./ShopBy";
import FilterBy from "./FilterBy";

export interface PriceRange {
  label: string;
  min?: number;
  max?: number;
}

interface Category {
  _id: string;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string | null) => void;
  onPriceSelect?: (range: PriceRange | null) => void;
  selectedCategory?: string | null;
  selectedPrice?: PriceRange | null;
  onApply?: () => void; // Cierra el modal si se pasa
}

export default function Sidebar({
  categories,
  onCategorySelect,
  onPriceSelect,
  selectedCategory: defaultSelectedCategory,
  selectedPrice: defaultSelectedPrice,
  onApply,
}: SidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultSelectedCategory || null
  );
  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(
    defaultSelectedPrice || null
  );

  const handleApplyFilters = () => {
    onCategorySelect?.(selectedCategory);
    onPriceSelect?.(selectedPrice);
    onApply?.(); 
    localStorage.removeItem("shopFilters");
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    onCategorySelect?.(null);
    onPriceSelect?.(null);
  };

  return (
    <aside className="space-y-8">
      <ShopBy
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FilterBy selectedRange={selectedPrice} onChange={setSelectedPrice} />

      <div className="flex flex-col gap-3 pt-4">
  {/* Apply Filters */}
  <button
    onClick={handleApplyFilters}
    className="
      w-full
      bg-slate-800 
      text-white 
      py-2 
      rounded-lg 
      shadow-md 
      transition duration-200 ease-in-out transform 
      hover:bg-slate-700 
      hover:text-slate-50 
      hover:-translate-y-0.5 
      hover:shadow-lg
    "
  >
    Apply Filters
  </button>

  {/* Reset Filters */}
  <button
    onClick={handleResetFilters}
    className="
      w-full 
      bg-slate-200 
      text-slate-800 
      py-2 
      rounded-md 
      shadow-sm
      transition duration-200 ease-in-out transform 
      hover:bg-slate-400 
      hover:text-slate-50 
      hover:-translate-y-0.5 
      hover:shadow-md
    "
  >
    Reset Filters
  </button>
</div>

    </aside>
  );
}
