"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SellerLayout from "./seller-layout";
import UserLayout from "./user-layout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [isSeller, setIsSeller] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const checkSeller = async () => {
      const res = await fetch(`/api/check-seller?clerkId=${user.id}`);
      const data = await res.json();
      setIsSeller(data.isSeller);
    };

    checkSeller();
  }, [user, isLoaded]);

  if (!isLoaded || isSeller === null) return null;

  return isSeller ? (
    <SellerLayout>{children}</SellerLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
}
