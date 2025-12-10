"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  value?: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
  widthClass?: string; // opcional por si quieres controlar el tamaño
}

export default function DropdownSelect({
  options,
  value = null,
  placeholder = "Select an option",
  onChange,
  widthClass = "w-40",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`
          flex items-center justify-between gap-2 px-3 py-2 
          bg-gray-100 border border-gray-400 rounded-md 
          text-gray-700 text-sm transition-all dark:bg-gray-800 dark:text-slate-300
          ${widthClass}
        `}
      >
        <span>{selected?.label || placeholder}</span>
        <ChevronDownIcon
          className={`size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className={`
              absolute top-full right-0 mt-2 
              bg-white shadow-md border border-gray-300 
              rounded-md py-2 text-sm z-50 dark:bg-gray-800 dark:text-slate-300
              ${widthClass}
            `}
          >
            {options.map((opt) => (
              <button
                type="button"
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 rounded 
                  transition-colors
                  ${
                    value === opt.value
                      ? "bg-gray-200 text-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
