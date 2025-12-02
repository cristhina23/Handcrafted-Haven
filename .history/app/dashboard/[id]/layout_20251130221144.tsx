"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import LayoutWrapper from "@/components/Dashboard/LayoutWrapper";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [collapsed, setCollapsed] = useState(false);   // ✅ LO QUE FALTABA
  const [screenSize, setScreenSize] = useState(1200);

  const currentColor = "#4f46e5";

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
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          screenSize={screenSize}
          currentColor={currentColor}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <LayoutWrapper collapsed={collapsed}>
          {children}
        </LayoutWrapper>
      </div>
    </ThemeProvider>
  );
}
