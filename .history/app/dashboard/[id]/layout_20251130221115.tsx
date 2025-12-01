// app/(dashboard)/layout.tsx

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import LayoutWrapper from "@/components/Dashboard/LayoutWrapper";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(1200);
  const currentColor = "#4f46e5"; 
  const [collapsed, setCollapsed] = useState(false)

  // Detecta cambios de pantalla
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider>
    <div className="flex bg-background text-foreground min-h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        screenSize={screenSize}
        currentColor={currentColor}
      />

      <LayoutWrapper setCollapsed={setCollapsed}>{children}</LayoutWrapper>
    </div>
    </ThemeProvider>
  );
}
