"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import Sidebar from "@/components/Dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex bg-white dark:bg-[#0f0f0f] text-black dark:text-white min-h-screen">
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* CONTENIDO DEL DASHBOARD */}
        <div className="flex-1 p-6">
          {children}
        </div>

      </div>
    </ThemeProvider>
  );
}
