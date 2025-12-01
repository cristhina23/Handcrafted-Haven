"use client";

import Link from "next/link";
import { sidebarLinks } from "./navigation";
import { X } from "lucide-react";
import { FC, useState } from "react";

interface SidebarProps {
  activeMenu: boolean;
  setActiveMenu: (value: boolean) => void;
  screenSize: number;
  currentColor: string;
  collapsed: boolean
  setCollapsed: (value: boolean) => void

}

const Sidebar: FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  screenSize,
  currentColor,
  

}) => {
  const [collapsed, setCollapsed] = useState(false);
  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 760) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-4 pl-4 py-3 rounded-lg text-white text-[15px] font-medium m-2";
  const normalLink =
    "flex items-center gap-4 pl-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 m-2";

  if (!activeMenu) return null;

  return (
    <div className=" h-screen overflow-y-auto pb-10 w-64 bg-white dark:bg-[#1e1e1e] shadow-md">
      <div className="flex justify-between items-center p-4">
        <Link
          href="/"
          onClick={handleCloseSidebar}
          className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="text-primary">Hancrated</span>
        </Link>

        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          style={{ color: currentColor }}
          className="text-xl rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
        >
          <X />
        </button>
      </div>

      <div className="mt-5">
        {sidebarLinks.map((section) => (
          <div key={section.title}>
            <p className="text-gray-400 uppercase px-4 mt-4 mb-2 text-sm">
              {section.title}
            </p>

            {section.links.map((link) => {
              const Icon = link.icon; // 👈 sacamos el componente aquí

              return (
                <Link
                  href={`/${link.name}`}
                  key={link.name}
                  onClick={handleCloseSidebar}
                  className={normalLink}
                >
                  <Icon size={20} /> {/* 👈 ya podemos renderizar */}
                  <span className="capitalize">
                    {link.name.replace("-", " ")}
                  </span>
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
