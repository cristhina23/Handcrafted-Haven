// hooks/useRandomProducts.ts
import { useState, useEffect } from "react";

export interface Product {
  _id: string;
  title: string;
  price: number;
  rating?: number;
  images: string[];
}

export function useRandomProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products/random");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch random products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
