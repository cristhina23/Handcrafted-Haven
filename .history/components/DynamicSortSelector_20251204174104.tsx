"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Check } from "lucide-react";

export interface DynamicSortSelectorProps<T extends string> {
  options: Record<T, string>;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export default function DynamicSortSelector<T extends string>({
  options,
  defaultValue,
  onChange,
}: DynamicSortSelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T>(defaultValue as T);
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

  const handleSelect = (value: T) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-48" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 bg-white dark:bg-[#3b82f6] border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-slate-700 text-sm dark:text-sl"
      >
        <span>{options[selected]}</span>
        <ChevronDownIcon className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-300 rounded-lg shadow-xl z-50 py-2"
          >
            {Object.entries(options).map(([value, label]) => {
              const val = value as T;
              const labelString = label as string;
              return (
                <button
                  key={value}
                  onClick={() => handleSelect(val)}
                  className={`w-full flex justify-between items-center text-left px-3 py-2 text-sm hover:bg-slate-100 transition ${selected === val ? "bg-slate-200 font-medium" : ""}`}
                >
                  {labelString}
                  {selected === val && <Check className="size-4 text-slate-600" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
