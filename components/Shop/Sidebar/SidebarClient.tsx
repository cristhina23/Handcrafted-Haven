"use client";

import { useState } from "react";
import ShopBy from "./ShopBy";
import FilterBy from "./FilterBy";

interface Category {
  _id: string;
  name: string;
}

interface PriceRange {
  label: string;
  min?: number;
  max?: number;
}

interface SidebarProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string | null) => void;
  onPriceSelect?: (range: PriceRange | null) => void;
}

export default function Sidebar({
  categories,
  onCategorySelect,
  onPriceSelect,
}: SidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(null);

  const handleApplyFilters = () => {
    onCategorySelect?.(selectedCategory);
    onPriceSelect?.(selectedPrice);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    onCategorySelect?.(null);
    onPriceSelect?.(null);
  };

  return (
    <aside className="space-y-8">

      <ShopBy
        categories={categories}
        onSelect={(catId) => setSelectedCategory(catId)}
      />

      <FilterBy
        onChange={(range) => setSelectedPrice(range)}
        selectedRange={selectedPrice}
      />

      <div className="flex flex-col gap-3 pt-4">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          Apply Filters
        </button>

        <button
          onClick={handleReset}
          className="w-full border border-gray-400 py-2 rounded-md hover:bg-gray-100 transition"
        >
          Reset
        </button>
      </div>

    </aside>
  );
}
