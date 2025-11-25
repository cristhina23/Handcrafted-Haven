"use client";

import React from "react";

interface Category {
  _id: string;
  name: string;
}

interface ShopByProps {
  categories: Category[];
  onSelect?: (category: Category) => void;
}

const ShopBy: React.FC<ShopByProps> = ({ categories, onSelect }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="font-semibold text-xl text-slate-800 mb-4">Shop by Categories</h3>
      <ul className="space-y-2 text-sm text-slate-600">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="cursor-pointer hover:text-slate-900"
            onClick={() => onSelect?.(cat)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ShopBy;
