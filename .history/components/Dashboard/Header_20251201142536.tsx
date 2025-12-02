"use client";

import React from "react";
import DashboardThemeToggle from "./DashboardThemeToggle";
import { Bell, ListIndentDecrease } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { isSignedIn, user } = useUser();
  console.log({user.userId})

  return (
    <div className="w-full bg-slate-900 dark:bg-card flex items-center justify-between px-6 py-2 lg:py-4 gap-4">
      <ListIndentDecrease
        className="text-muted-foreground cursor-pointer"
        size={24}
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className="flex gap-8">
        <DashboardThemeToggle />
        <button className="p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-red-700">
          <Bell  size={20} />
        </button>
        <div>
          {/* <Image
            width={50}
            height={50}
            src={user?.imageUrl || ""}
            alt="user"
            className="w-10 h-10 rounded-full"
          /> */}
        </div>
      
      </div>
    </div>
  );
};

export default Header;
