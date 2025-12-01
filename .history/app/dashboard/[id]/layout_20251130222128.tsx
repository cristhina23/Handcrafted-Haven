"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/components/Dashboard/LayoutWrapper";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
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
        

        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
    </ThemeProvider>
  );
}
