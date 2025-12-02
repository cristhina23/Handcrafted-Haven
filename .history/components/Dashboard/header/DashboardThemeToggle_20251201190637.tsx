"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function DashboardThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-slate-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={20} />}
    </button>
  );
}
