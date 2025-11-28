"use client";

import { useState, useEffect } from "react";
import ShopBy from "./ShopBy";
import FilterBy, { PriceRange } from "./FilterBy";

interface Category {
  _id: string;
  name: string;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory?: string | null;
  selectedPrice?: PriceRange | null;
  onCategorySelect?: (categoryId: string | null) => void;
  onPriceSelect?: (range: PriceRange | null) => void;
  onApply?: () => void; // optional for mobile modal
}

export default function Sidebar({
  categories,
  selectedCategory: defaultSelectedCategory,
  selectedPrice: defaultSelectedPrice,
  onCategorySelect,
  onPriceSelect,
  onApply,
}: SidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    defaultSelectedCategory || null
  );

  const [selectedPrice, setSelectedPrice] = useState<PriceRange | null>(
    defaultSelectedPrice || null
  );

  // Custom price inputs
  const [customMin, setCustomMin] = useState<number | "">(defaultSelectedPrice?.min ?? "");
  const [customMax, setCustomMax] = useState<number | "">(defaultSelectedPrice?.max ?? "");

  // Send updates when Apply is clicked
  const handleApplyFilters = () => {
    let priceToSend = selectedPrice;

    if (selectedPrice?.label === "Custom") {
      priceToSend = {
        label: "Custom",
        min: customMin !== "" ? Number(customMin) : undefined,
        max: customMax !== "" ? Number(customMax) : undefined,
      };
    }

    onCategorySelect?.(selectedCategory);
    onPriceSelect?.(priceToSend);
    onApply?.();
    localStorage.removeItem("shopFilters");
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setCustomMin("");
    setCustomMax("");
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

      <FilterBy
        selectedRange={selectedPrice}
        onChange={setSelectedPrice}
        customMin={customMin}
        customMax={customMax}
        setCustomMin={setCustomMin}
        setCustomMax={setCustomMax}
      />

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
