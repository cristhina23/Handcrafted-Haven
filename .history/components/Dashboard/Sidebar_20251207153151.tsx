"use client";

import Link from "next/link";
import { sidebarLinks } from "./navigation";
import { FC, useState } from "react";
import CustomAccordionItem from "../CustomAccordionItem";

interface SidebarProps {
  activeMenu: boolean;
  setActiveMenu: (value: boolean) => void;
  screenSize: number;
  currentColor: string;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  screenSize,
  collapsed,
  setCollapsed,
}) => {
  const isMobile = screenSize <= 760;

  // overlay solo depende de: mobile + expanded
  const isOverlay = isMobile && !collapsed;

  const handleToggle = () => {
    // Si está colapsado → abrir y mostrar overlay
    if (collapsed) {
      setCollapsed(false);
      setActiveMenu(true);
    } else {
      // Si está full → cerrar
      setCollapsed(true);

      // en mobile, cerrar overlay
      if (isMobile) {
        setActiveMenu(false);
      }
    }
  };

  const handleCloseSidebar = () => {
    if (isMobile) {
      setCollapsed(true);
      setActiveMenu(false);
    }
  };

  // Si NO está activo y no es mobile → no renderizar nada
  if (!activeMenu && !isMobile) return null;

  return (
    <div
      className={`h-screen overflow-y-auto pb-10 bg-slate-900 text-white dark:bg-slate-800 shadow-md transition-all duration-300

      ${collapsed ? "w-16" : "w-64"}

      ${isOverlay ? "fixed top-0 left-0 z-50" : ""}
      ${isMobile && collapsed ? "relative" : ""}
    `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <Link
            href="/"
            onClick={handleCloseSidebar}
            className="flex items-center gap-3 text-xl font-bold text-slate-300"
          >
            Hancrated
          </Link>
        )}

        {isMobile && (
          <button
            onClick={handleToggle}
            className="text-slate-300"
          >
            {collapsed ? "" : "✕"}
          </button>
        )}
      </div>

      {/* LINKS */}
      <div className="mt-5">
        {sidebarLinks.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="text-slate-300 uppercase px-4 mt-4 mb-2 text-sm">
                {section.title}
              </p>
            )}

            {section.links.map((link) => (
              <CustomAccordionItem
                key={link.name}
                label={link.name.replace("-", " ")}
                icon={link.icon}
                collapsed={collapsed}
                
              >
                
                {link.sublinks?.map((sub) => (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={handleCloseSidebar}
                    className="text-md text-slate-300 hover:bg-slate-700 px-4 py-2 rounded"
                  >
                    {sub.name}
                  </Link>
                ))}
              </CustomAccordionItem>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
