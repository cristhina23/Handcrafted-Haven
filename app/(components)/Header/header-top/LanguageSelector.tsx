"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

type Language = "en" | "es";

type Props = {
  defaultLang?: Language;
  onChange?: (lang: Language) => void;
};

export default function LanguageSelector({
  defaultLang = "en",
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(defaultLang);
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

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    onChange?.(lang);
    setIsOpen(false);
  };

  const LANG_LABELS = {
    en: "English",
    es: "Español",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          group flex items-center gap-2 px-3 py-1.5 
          bg-sky-300 border border-gray-700 
          rounded-md text-gray-700 text-sm 
          hover:border-gray-500 transition-all
        "
      >
        <span>{LANG_LABELS[language]}</span>
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
              absolute top-full right-0 mt-2 w-40 
              bg-white text-slate-700 border border-slate-300 
              rounded-md shadow-xl py-2 z-50 backdrop-blur-lg
            "
          >
            {(["en", "es"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`
                  w-full text-left px-3 py-2 text-sm rounded 
                  transition-colors
                  ${
                    language === lang
                      ? "bg-blue-500/20 text-slate-500"
                      : "text-slate-500 hover:bg-sky-500/50 hover:text-slate-700"
                  }
                `}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
