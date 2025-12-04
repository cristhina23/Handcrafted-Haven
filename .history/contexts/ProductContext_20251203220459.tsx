"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/types";

interface ProductContextType {
  seller: Product | null;
  loading: boolean;
  error: string | null;
}

const SellerContext = createContext<ProductContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function SellerProvider({ children }: Props) {
  const { user, isSignedIn } = useUser();
  const [seller, setSeller] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    async function fetchSeller() {
      try {
        const res = await fetch(`/api/seller/get-by-clerkId?clerkId=${user?.id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch seller");
        }
        const data = await res.json();
        setSeller(data.seller);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeller();
  }, [isSignedIn, user]);

  return (
    <SellerContext.Provider value={{ seller, loading, error }}>
      {children}
    </SellerContext.Provider>
  );
}

// Hook para consumir el contexto
export function useSeller() {
  const context = useContext(SellerContext);
  if (!context) throw new Error("useSeller must be used within a SellerProvider");
  return context;
}
