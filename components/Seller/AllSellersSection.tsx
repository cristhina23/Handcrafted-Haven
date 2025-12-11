"use client";

import { useEffect, useState, useCallback } from "react";
import isEqual from "lodash.isequal";
import CategoryNames from "./categoryButtons";
import SellerCardList from "./SellerCardList";
import { SellerType } from "@/types";

type ViewMode = "grid" | "list";

export default function SellersList() {
  const [data, setData] = useState<SellerType[]>([]);
  const [activeCategoryName, setActiveCategoryName] = useState<string | null>(
    null
  );
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    fetch("/api/sellers")
      .then((res) => res.json())
      .then((result) => {
        if (!isEqual(result, data)) {
          setData(result);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryClick = useCallback((categoryName: string) => {
    setActiveCategoryName((prev) =>
      prev === categoryName ? null : categoryName
    );
  }, []);

  function handleReturnAll() {
    setActiveCategoryName(null);
  }

  const filteredSellersByCategory = activeCategoryName
    ? data.filter((seller) => seller.specialties.includes(activeCategoryName))
    : data;

  return (
    <section>
      <div className="my-10 font-merriweather">
        <h2 className="text-3xl font-semibold">Our Artisans</h2>
        <p className="text-base">Meet the best of the best</p>
      </div>

      <div className="flex gap-4 mb-6 items-center justify-center">
        <button
          onClick={handleReturnAll}
          className={`px-4 py-2 border rounded-lg 
                        ${
                          !activeCategoryName
                            ? "bg-(--brand-dark) text-white"
                            : "bg-gray-100"
                        }`}
        >
          All
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 border rounded-lg 
                        ${
                          viewMode === "grid"
                            ? "bg-(--brand-dark) text-white"
                            : "bg-gray-100"
                        }`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 border rounded-lg 
                        ${
                          viewMode === "list"
                            ? "bg-(--brand-dark) text-white"
                            : "bg-gray-100"
                        }`}
        >
          List
        </button>
      </div>

      <CategoryNames
        onCategoryClick={handleCategoryClick}
        activeCategoryId={activeCategoryName}
      />

      <SellerCardList data={filteredSellersByCategory} viewMode={viewMode} />
    </section>
  );
}
