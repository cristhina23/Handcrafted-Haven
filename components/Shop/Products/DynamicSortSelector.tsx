"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Check } from "lucide-react";

export type SortOption =
  | "manual"
  | "best-selling"
  | "title-ascending"
  | "title-descending"
  | "price-ascending"
  | "price-descending"
  | "created-ascending"
  | "created-descending";

const OPTIONS: Record<SortOption, string> = {
  manual: "Featured",
  "best-selling": "Best Selling",
  "title-ascending": "Alphabetically A-Z",
  "title-descending": "Alphabetically Z-A",
  "price-ascending": "Price, low to high",
  "price-descending": "Price, high to low",
  "created-ascending": "Date, old to new",
  "created-descending": "Date, new to old",
};

interface Props {
  defaultValue?: SortOption;
  onChange?: (value: SortOption) => void;
}

export default function DynamicSortSelector({
  defaultValue = "manual",
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SortOption>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: SortOption) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full  md:w-48" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between w-full 
          px-3 py-2 
          bg-white border border-slate-300 
          rounded-lg shadow-sm text-slate-700 text-sm
        "
      >
        <span>{OPTIONS[selected]}</span>
        <ChevronDownIcon
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="
              absolute top-full left-0 mt-2 w-full 
              bg-white border border-slate-300 
              rounded-lg shadow-xl z-50 py-2
            "
          >
            {Object.entries(OPTIONS).map(([value, label]) => {
              const val = value as SortOption;
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(val)}
                  className={`
                    w-full flex justify-between items-center
                    text-left px-3 py-2 text-sm 
                    hover:bg-slate-100 transition
                    ${selected === value ? "bg-slate-200 font-medium" : ""}
                  `}
                >
                  {label}
                  {selected === value && <Check className="size-4 text-slate-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
