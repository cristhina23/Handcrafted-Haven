"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Package } from "lucide-react";

export default function UserSidebar() {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    `flex items-center gap-3 p-3 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition ${
      pathname === path ? "bg-slate-200 dark:bg-slate-700 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white dark:bg-slate-900 shadow-md p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">User Panel</h2>
        <p className="text-sm text-gray-500">Your account</p>
      </div>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className={linkClasses("/dashboard")}>
          <Home size={18} />
          Dashboard
        </Link>

        <Link href="/dashboard/wishlist" className={linkClasses("/dashboard/wishlist")}>
          <Heart size={18} />
          Wishlist
        </Link>

        <Link href="/dashboard/orders" className={linkClasses("/dashboard/orders")}>
          <Package size={18} />
          Orders
        </Link>
      </nav>
    </aside>
  );
}
