"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Header from "@/components/Dashboard/header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SellerProvider } from "@/contexts/SellerContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(1200);

  useEffect(() => {
    const updateSize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <SellerProvider>
    <ThemeProvider>
    <div className="flex h-screen">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        screenSize={screenSize}
        currentColor="#4f46e5"
      />


      <div className="flex-1 flex flex-col">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        
        <main className="p-6 overflow-y-auto flex-1 bg- text-foreground">
          {children}
        </main>
      </div>
    </div>
    </ThemeProvider>
  </SellerProvider>
  );
}
