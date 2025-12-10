"use client";

import { useUser } from "@clerk/nextjs";

export default function WishList() {
  const { user } = useUser();

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Your Wish List</h2>

      <div className="text-gray-500">
        {user
          ? "Your wishlist items will appear here soon…"
          : "Sign in to view your wishlist."}
      </div>
    </div>
  );
}
