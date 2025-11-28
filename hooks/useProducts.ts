// hooks/useProducts.ts
import { useState, useEffect } from "react";

export interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  images: string[];
}

interface UseProductsOptions {
  limit?: number; // opcional para limitar cantidad
}

export function useProducts({ limit }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = "/api/products";
        if (limit) url += `?limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  return { products, loading, error };
}
