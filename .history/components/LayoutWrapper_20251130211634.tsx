"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <main className="flex-1 p-6">{children}</main>
      {!<Footer />}
    </>
  );
}
