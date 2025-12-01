"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function DashboardThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-red"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
