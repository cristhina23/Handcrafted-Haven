"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Header from "@/components/Dashboard/header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SellerProvider } from "@/contexts/SellerContext";
import { OrderProvider } from "@/contexts/OrderContext";
import { SellerProductsProvider } from "@/contexts/SellerProductsContext";
import { SellerOrdersProvider } from "@/contexts/SellerOrdersContext";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
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
      <SellerProductsProvider>
        <OrderProvider>
          <SellerOrdersProvider>
            <ThemeProvider>
              <div className="flex h-screen w-full">
                <Sidebar
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  screenSize={screenSize}
                  currentColor="#4f46e5"
                />

                <div className="flex-1 min-w-0 flex flex-col">
                  <Header collapsed={collapsed} setCollapsed={setCollapsed} />
                  <main className="p-2 md:p-6 h-full overflow-auto flex-1 bg-slate-100 dark:bg-slate-900 text-foreground">
                    {children}
                  </main>
                </div>
              </div>
            </ThemeProvider>
          </SellerOrdersProvider>
        </OrderProvider>
      </SellerProductsProvider>
    </SellerProvider>
  );
}
