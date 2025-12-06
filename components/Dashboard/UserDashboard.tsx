"use client";

import OrdersSection from "./userSections/OrdersSection";
import WishlistSection from "./userSections/WishlistSection";

export default function UserDashboard() {
  return (
    <div className="p-6 bg-slate-100 dark:bg-slate-900 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold">Your Dashboard</h2>

      <OrdersSection />
      <WishlistSection />
    </div>
  );
}
