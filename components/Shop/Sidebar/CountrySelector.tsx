"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, Check } from "lucide-react";

interface Props {
  countries: string[];
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
}

export default function CountrySelector({ countries, defaultValue = null, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: string | null) => {
    setSelected(country);
    onChange?.(country);
    setIsOpen(false);
  };

  return (
    <div className="relative w-42 md:w-48" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between w-full 
          px-3 py-2 bg-white border border-slate-300 
          rounded-lg shadow-sm text-slate-700 text-sm
        "
      >
        <span>{selected || "All Countries"}</span>
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
            {/* Option for "All Countries" */}
            <button
              onClick={() => handleSelect(null)}
              className={`w-full flex justify-between items-center text-left px-3 py-2 text-sm hover:bg-slate-100 transition ${
                selected === null ? "bg-slate-200 font-medium" : ""
              }`}
            >
              All Countries
              {selected === null && <Check className="size-4 text-slate-600" />}
            </button>

            {/* Map countries */}
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => handleSelect(country)}
                className={`w-full flex justify-between items-center text-left px-3 py-2 text-sm hover:bg-slate-100 transition ${
                  selected === country ? "bg-slate-200 font-medium" : ""
                }`}
              >
                {country}
                {selected === country && <Check className="size-4 text-slate-600" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
