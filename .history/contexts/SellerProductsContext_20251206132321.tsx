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
  const [error, setError] = useState<string | null>(null);

  // GET seller products
  async function refreshProducts() {
    try {
      setLoading(true);

      const res = await fetch(`/api/products/seller`, { cache: "no-store" });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      console.error("Error loading products:", err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (isSignedIn && user) refreshProducts();
  }, [isSignedIn, user]);

  // CREATE product
  async function createProduct(data: Partial<Product>) {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }

  // UPDATE product
  async function updateProduct(id: string, data: Partial<Product>) {
    try {
      setLoading(true);
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
    }
  }

  // DELETE product
  async function deleteProduct(id: string) {
    try {
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
    }
  }

  return (
    <SellerProductsContext.Provider
      value={{
        products,
        loading,
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

// HOOK
export function useProducts() {
  const context = useContext(SellerProductsContext);
  if (!context)
    throw new Error("useProducts must be used inside SellerProductsProvider");
  return context;
}
