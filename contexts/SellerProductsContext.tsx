"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/types";

interface SellerProductsContextType {
  products: Product[];
  loading: boolean;
  actionLoading: boolean;
  error: string | null;

  createProduct: (data: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const SellerProductsContext = createContext<
  SellerProductsContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function SellerProductsProvider({ children }: Props) {
  const { user, isSignedIn } = useUser();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshProducts() {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/seller`, { cache: "no-store" });
      const data = await res.json();

      if (data.error === "Seller profile not found") {
        setProducts([]);
        setError(null);
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch products");
      }

      setProducts(data);
      setError(null);
      
    } catch (err: any) {
      console.error("Error loading products:", err.message);
      setError(err.message);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn && user) refreshProducts();
  }, [isSignedIn, user]);

  async function createProduct(data: Partial<Product>) {
    try {
      setActionLoading(true);

      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create product");
      }

      await refreshProducts();
    } catch (err) {
      console.error("Create error:", err);
    } finally {
      setActionLoading(false);
    }
  }

  async function updateProduct(id: string, data: Partial<Product>) {
    try {
      setActionLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update product");
      }

      await refreshProducts();
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    try {
      setActionLoading(true);

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete product");
      }

      await refreshProducts();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <SellerProductsContext.Provider
      value={{
        products,
        loading,
        actionLoading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
      }}
    >
      {children}
    </SellerProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(SellerProductsContext);
  if (!context)
    throw new Error("useProducts must be used inside SellerProductsProvider");
  return context;
}
