"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomAccordionItem({
  label,
  icon: Icon,
  children,
  collapsed,
}: {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  children: React.ReactNode;
  collapsed: boolean;
}) {
  const hasChildren = Array.isArray(children) || !!children; // detecta si tiene sublinks
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    }
  };

  return (
    <div className="mb-1">
      {/* Trigger */}
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
        ${
          collapsed
            ? "justify-start"
            : "text-slate-300 hover:bg-slate-800 dark:hover:bg-slate-900/60"
        }`}
      >
        <Icon size={20} />

        {!collapsed  (
          <span className="capitalize flex flex-1 justify-start">{label}</span>
        )}

        
        {!collapsed && hasChildren && (
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

 
      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-40 mt-2" : "max-h-0"
          }`}
        >
          {!collapsed && (
            <div className="pl-12 pr-4 flex flex-col gap-2 text-sm text-slate-400">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
