"use client";

import React from "react";
import DashboardThemeToggle from "./DashboardThemeToggle";
import { ListIndentDecrease } from "lucide-react";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="w-full bg-slate-900 dark:bg-card flex items-center justify-between px-6 py-2 lg:py-4 gap-4">
      <ListIndentDecrease
        className="text-muted-foreground cursor-pointer"
        size={24}
        onClick={() => setCollapsed(!collapsed)}
      />

      <DashboardThemeToggle />
      <
    </div>
  );
};

export default Header;
