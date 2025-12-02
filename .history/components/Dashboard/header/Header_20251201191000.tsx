"use client";

import React, { useEffect } from "react";
import DashboardThemeToggle from "./DashboardThemeToggle";
import { Bell, ListIndentDecrease } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import ProfileImage from "./ProfileImage";
import { useSeller } from "@/contexts/SellerContext";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { isSignedIn, user } = useUser();
  const { seller, loading, error } = useSeller();

  
  




  return (
    <div className="w-full bg-slate-900 dark:bg-card flex items-center justify-between px-6 py-2 lg:py-4 gap-4">
      <ListIndentDecrease
        className="text-slate-100 cursor-pointer"
        size={24}
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className="flex gap-4">
        <DashboardThemeToggle  />
        <button className="p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-red-700">
          <Bell  size={20} />
        </button>
        <div>
         <ProfileImage sellerImageUrl={seller?.profileImage || user?.imageUrl} user={user} />
        </div>
      
      </div>
    </div>
  );
};

export default Header;
