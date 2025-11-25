"use client";

import React from "react";

interface PriceRange {
  label: string;
  min?: number;
  max?: number;
}

interface Props {
  ranges?: PriceRange[];
  onChange?: (range: PriceRange, checked: boolean) => void;
  
}

const defaultRanges: PriceRange[] = [
  { label: "Any Price" },
  { label: "0 USD to 25", min: 0, max: 25 },
  { label: "25 USD to 50", min: 25, max: 50 },
  { label: "50 USD to 100", min: 50, max: 100 },
  { label: "100 USD and above", min: 100 },
];

const FilterBy: React.FC<Props> = ({ ranges = defaultRanges, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200  flex flex-col gap-8">
    <section >
      <h3 className="font-semibold text-xl text-slate-800 mb-4">Filter By</h3>
      <p className="text-lg text-slate-500 mb-2 font-semibold">Price</p>
      <ul className="space-y-2 text-sm text-slate-600">
        {ranges.map((range, index) => (
          <li key={index} className="flex items-center">
            <input
              type="checkbox"
              onChange={(e) => onChange?.(range, e.target.checked)}
            />
            <span className="ml-2">{range.label}</span>
          </li>
        ))}
      </ul>
    </section>

     
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {["#000000", "#F44336", "#4CAF50", "#2196F3", "#9C27B0", "#FFEB3B", "#795548"].map(color => (
            <div
              key={color}
              className="w-6 h-6 rounded-full cursor-pointer border border-slate-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>

      {/* Shipped From */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-4">Shipped From</h3>
        <select className="w-full border rounded-md px-3 py-2 text-sm text-slate-600">
          <option>Anywhere</option>
          <option>USA</option>
          <option>EU</option>
          <option>Asia</option>
        </select>
      </section>
      </div>
  );
};

export default FilterBy;
