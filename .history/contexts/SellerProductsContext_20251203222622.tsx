"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/types";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;

  createProduct: (data: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;
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

  // ====== Fetch products ======
  async function refreshProducts() {
    try {
      setLoading(true);
      const res = await fetch(`/api/products`, { cache: "no-store" });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch products");
      }

      const data = await res.json();
      setProducts(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isSignedIn && user) {
      refreshProducts();
    }
  }, [isSignedIn, user]);

  // ====== Create Product ======
  async function createProduct(data: Partial<Product>) {
    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create product");

      await refreshProducts();
    } catch (err) {
      console.error(err);
    }
  }

  // ====== Update Product ======
  async function updateProduct(id: string, data: Partial<Product>) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update product");

      await refreshProducts();
    } catch (err) {
      console.error(err);
    }
  }

  // ====== Delete Product ======
  async function deleteProduct(id: string) {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Failed to delete product");

      await refreshProducts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ProductContext.Provider
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
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
}
