"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { SellerType } from "@/types";

interface SellerContextType {
  seller: SellerType | null;
  loading: boolean;
  error: string | null;
  refreshSeller: () => Promise<void>;
  updateSeller: (data: Partial<SellerType>) => Promise<void>;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function SellerProvider({ children }: Props) {
  const { user, isSignedIn } = useUser();
  const [seller, setSeller] = useState<SellerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeller = async () => {
    if (!isSignedIn || !user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/seller/get-by-clerkId?clerkId=${user.id}`, { cache: "no-store" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch seller");
      }
      const data = await res.json();
      setSeller(data.seller);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeller();
  }, [isSignedIn, user]);

  const refreshSeller = async () => {
    await fetchSeller();
  };

  const updateSeller = async (data: Partial<SellerType>) => {
    if (!seller) return;
    const res = await fetch("/api/seller/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update seller");
    await fetchSeller(); // refresca automáticamente el estado
  };

  return (
    <SellerContext.Provider value={{ seller, loading, error, refreshSeller, updateSeller }}>
      {children}
    </SellerContext.Provider>
  );
}


export function useSeller() {
  const context = useContext(SellerContext);
  if (!context) throw new Error("useSeller must be used within a SellerProvider");
  return context;
}
