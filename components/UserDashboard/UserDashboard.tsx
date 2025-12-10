"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import UserLayout from "./UserLayout";

export default function UserDashboard() {
  const { user } = useUser();

  return (
    <UserLayout>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user?.firstName || "User"} 👋
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Manage your activity, view your wishlist and track your orders.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link href="/dashboard/wishlist">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow cursor-pointer hover:shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition">
            <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
            <p>Your wishlist will appear here...</p>
          </div>
        </Link>

        <Link href="/dashboard/orders">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-lg shadow cursor-pointer hover:shadow-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition">
            <h2 className="text-xl font-semibold mb-2">Orders</h2>
            <p>Your orders will appear here...</p>
          </div>
        </Link>

      </div>
    </UserLayout>
  );
}
