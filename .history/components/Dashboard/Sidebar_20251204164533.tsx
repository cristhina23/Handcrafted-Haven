"use client";

import Link from "next/link";
import { sidebarLinks } from "./navigation";
import { FC, useEffect, useState } from "react";
import CustomAccordionItem from "../CustomAccordionItem";

const Sidebar: FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  screenSize,
  collapsed,
  setCollapsed,
}) => {
  const isMobile = screenSize <= 760;
  const [isOverlay, setIsOverlay] = useState(false);

  // Ajustar sidebar por tamaño de pantalla
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true); // solo iconos
    }
  }, [screenSize]);

  // Manejo overlay en mobile
  useEffect(() => {
    if (isMobile) {
      setIsOverlay(activeMenu && !collapsed); 
    }
  }, [activeMenu, collapsed, isMobile]);

  const handleCloseSidebar = () => {
    if (isMobile) {
      setIsOverlay(false);
      setActiveMenu(false);
    }
  };

  // Si no está visible en desktop no mostrar
  if (!activeMenu && !isMobile) return null;

  return (
    <div
      className={`h-screen overflow-y-auto pb-10 bg-slate-900 text-white shadow-md transition-all duration-300

        /* Ancho según estado */
        ${collapsed ? "w-20" : "w-64"}

        /* Mobile overlay */
        ${isOverlay ? "fixed top-0 left-0 z-50" : ""}

        /* Mobile cuando está colapsado: que NO esté fixed */
        ${isMobile && collapsed ? "relative z-10" : ""}
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
