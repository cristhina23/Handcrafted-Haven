"use client";

import { useUser } from "@clerk/nextjs";

export default function OrdersView() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Your Orders</h2>

      <div className="text-gray-500">
        {user
          ? "You have no orders yet… but this is where they’ll appear."
          : "Sign in to view your orders."}
      </div>
    </div>
  );
}
