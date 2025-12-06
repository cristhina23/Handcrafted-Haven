"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/types";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function ProductProvider({ children }: Props) {
  const { user, isSignedIn } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products`, { cache: "no-store" });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch products");
        }

        const data = await res.json(); // <— AQUÍ llega el array
        setProducts(data);             // <— DIRECTO, porque tu API devuelve [{}, {}]
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [isSignedIn, user]);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}
