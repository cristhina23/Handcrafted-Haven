"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function CustomAccordionItem({
  label,
  icon: Icon,
  children,
  collapsed,
  href,
}: {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  children?: React.ReactNode;
  collapsed: boolean;
  href?: string; // <-- ADD THIS
}) {
  const hasChildren = !!children;
  const [open, setOpen] = useState(false);


  const handleToggle = () => {
    if (hasChildren) setOpen(!open);
  };

  return (
    <div className="mb-1">
     
      {!hasChildren && href && (
        <Link
          href={href}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200
            ${collapsed ? "justify-start" : "text-slate-300 hover:bg-slate-800"}
          `}
        >
          <Icon size={20} />
          {!collapsed && (
            <span className="capitalize">{label}</span>
          )}
        </Link>
      )}

     
      {hasChildren && (
        <>
          <button
            onClick={handleToggle}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
              ${
                collapsed
                  ? "justify-start"
                  : "text-slate-300 hover:bg-slate-800"
              }
            `}
          >
            <Icon size={20} />
            {!collapsed && (
              <span className="flex-1 capitalize">{label}</span>
            )}

            {!collapsed && (
              <ChevronDown
                size={18}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            )}
          </button>

          {/* SUBLINKS */}
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
        </>
      )}
    </div>
  );
}
