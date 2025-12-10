"use client";

import UserSidebar from "./UserSidebar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />

      <main className="flex-1 p-8 bg-gray-50 dark:bg-slate-800">
        {children}
      </main>
    </div>
  );
}
