"use client";

import Link from "next/link";
import { User, Package } from "lucide-react";

export default function DashboardHomeCards() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>

      <p className="text-gray-600">
        Manage your information and orders 💜
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">

        <Link
          href="/dashboard/my-profile"
          className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border 
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
              <User className="w-6 h-6 text-purple-700 dark:text-purple-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold group-hover:text-purple-600 transition">
                Profile
              </h2>
              <p className="text-gray-500 text-sm">
                View & edit your personal information.
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/order-history"
          className="group bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border 
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
              <Package className="w-6 h-6 text-blue-700 dark:text-blue-300" />
            </div>

            <div>
              <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
                Orders
              </h2>
              <p className="text-gray-500 text-sm">
                Review your purchase history and details.
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}
