"use client";

import Link from "next/link";
import { sidebarLinks } from "./navigation";
import { X } from "lucide-react";
import { FC } from "react";

interface SidebarProps {
  activeMenu: boolean;
  setActiveMenu: (value: boolean) => void;
  screenSize: number;
  currentColor: string;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  screenSize,
  currentColor,
  collapsed,
  setCollapsed,
}) => {
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 760) {
      setActiveMenu(false);
    }
  };

  if (!activeMenu) return null;

  return (
    <div
      className={`h-screen overflow-y-auto pb-10 bg-slate-900 text-white dark:bg-card shadow-md transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex justify-between items-center p-4">
        {!collapsed && (
          <Link
            href="/"
            onClick={handleCloseSidebar}
            className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            <span className="text-slate-300 dark:text-gray-300">Hancrated</span>
          </Link>
        )}
      </div>

      <div className="mt-5">
        {sidebarLinks.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="text-slate-300 uppercase px-4 mt-4 mb-2 text-sm">
                {section.title}
              </p>
            )}

            {section.links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  href={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSidebar}
                  className={`flex items-center gap-4 pl-4 py-3 rounded-lg m-2 transition-all duration-300
                   ${
                     collapsed
                       ? "justify-center"
                       : "text-slate dark:text-gray-200 hover:bg-slate-800 hover:text-gray-100 dark:hover:bg-slate-900/60 dark:hover:text-gray-100"
                   }`}
                >
                  <Icon size={20} />
                  {!collapsed && (
                    <span className="capitalize">
                      {link.name.replace("-", " ")}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
