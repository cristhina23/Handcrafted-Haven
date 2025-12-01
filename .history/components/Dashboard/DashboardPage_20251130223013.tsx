"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(1200);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        screenSize={screenSize}
        currentColor="#4f46e5"
      />

      {/* Content */}
      <div className="flex-1">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="p-6">
          Welcome, {user.firstName}! 👋
        </div>
      </div>
    </div>
  );
}
