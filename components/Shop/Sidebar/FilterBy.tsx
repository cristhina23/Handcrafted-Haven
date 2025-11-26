"use client";

import React from "react";

export interface PriceRange {
  label: string;
  min?: number;
  max?: number;
}

interface Props {
  ranges?: PriceRange[];
  onChange?: (range: PriceRange | null) => void;
  selectedRange?: PriceRange | null;

  // Props para custom input
  customMin?: number | "";
  customMax?: number | "";
  setCustomMin?: (value: number | "") => void;
  setCustomMax?: (value: number | "") => void;
}

const defaultRanges: PriceRange[] = [
  { label: "Any Price" },
  { label: "0 USD to 25", min: 0, max: 25 },
  { label: "25 USD to 50", min: 25, max: 50 },
  { label: "50 USD to 100", min: 50, max: 100 },
  { label: "100 USD and above", min: 100 },
  { label: "Custom" }, // Agregamos la opción custom
];

const FilterBy: React.FC<Props> = ({
  ranges = defaultRanges,
  onChange,
  selectedRange,
  customMin,
  customMax,
  setCustomMin,
  setCustomMax,
}) => {
  const isCustomSelected = selectedRange?.label === "Custom";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-8">
      <section>
        <h3 className="font-semibold text-xl text-slate-800 mb-4">Filter By</h3>
        <p className="text-lg text-slate-700 mb-2 font-semibold">Price</p>

        <ul className="space-y-2 text-sm text-slate-600">
          {ranges.map((range, index) => (
            <li key={index} className="flex items-center">
              <input
                type="radio"
                name="price-range"
                checked={selectedRange?.label === range.label}
                onChange={() => {
                  onChange?.(range);
                  if (range.label !== "Custom") {
                    setCustomMin?.("");
                    setCustomMax?.("");
                  }
                }}
                className="w-4 h-4 text-slate-800 border-slate-400 focus:ring-2 focus:ring-slate-500"
              />
              <span className="ml-2">{range.label}</span>
            </li>
          ))}
        </ul>

        {/* CUSTOM PRICE INPUTS */}
        <div className="mt-4 flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={customMin}
            onChange={(e) => setCustomMin?.(e.target.value === "" ? "" : Number(e.target.value))}
            disabled={!isCustomSelected}
            className={`w-1/2 border rounded-md px-2 py-1 ${
              isCustomSelected ? "border-slate-300" : "border-slate-200 bg-slate-100"
            }`}
          />
          <input
            type="number"
            placeholder="Max"
            value={customMax}
            onChange={(e) => setCustomMax?.(e.target.value === "" ? "" : Number(e.target.value))}
            disabled={!isCustomSelected}
            className={`w-1/2 border rounded-md px-2 py-1 ${
              isCustomSelected ? "border-slate-300" : "border-slate-200 bg-slate-100"
            }`}
          />
        </div>
      </section>
    </div>
  );
};

export default FilterBy;
