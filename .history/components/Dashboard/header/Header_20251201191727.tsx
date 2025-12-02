"use client";

import React, { useEffect } from "react";
import DashboardThemeToggle from "./DashboardThemeToggle";
import { Bell, ListIndentDecrease } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import ProfileImage from "./ProfileImage";
import { useSeller } from "@/contexts/SellerContext";
import NotificationDropdown from "./NotificationDropdown";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}


const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { isSignedIn, user } = useUser();
  const { seller, loading, error } = useSeller();

  const notifications = [
  { id: "1", message: "You have a new message" },
  { id: "2", message: "Your order has been shipped" },
  { id: "3", message: "New comment on your post" },
];
  




  return (
    <div className="w-full bg-slate-900 dark:bg-card flex items-center justify-between px-6 py-2 lg:py-4 gap-4">
      <ListIndentDecrease
        className="text-slate-300 dark:text-slate-200 cursor-pointer"
        size={24}
        onClick={() => setCollapsed(!collapsed)}
      />

      <div className="flex gap-4">
        <DashboardThemeToggle  />
        <button className="p-2 rounded-md hover:bg-gray-500 dark:hover:bg-gray-700 text-slate-300">
           <NotificationDropdown notifications={notifications} />
        </button>
        <div>
         <ProfileImage sellerImageUrl={seller?.profileImage || user?.imageUrl} user={user} />
        </div>
      
      </div>
    </div>
  );
};

export default Header;
