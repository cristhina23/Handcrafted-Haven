"use client";

interface Category {
  _id: string;
  name: string;
}

interface ShopByProps {
  categories: Category[];
  selectedCategory?: string | null;
  onSelect?: (categoryId: string | null) => void;
}

export default function ShopBy({ categories, selectedCategory, onSelect }: ShopByProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2">
      <h3 className="font-semibold text-xl text-slate-800 mb-4">Shop By Category</h3>

      <div className="flex flex-col gap-1">
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onSelect?.(cat._id)}
            className={`flex  text-slate-700 mb-2 font-semibold py-1 px-3 rounded-md hover:bg-gray-200 transition
              ${selectedCategory === cat._id ? "bg-gray-200 font-semibold" : ""}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
