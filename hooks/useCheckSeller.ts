// hooks/useCheckSeller.ts
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const useCheckSeller = () => {
  const { user } = useUser();
  const [isSeller, setIsSeller] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.id) { 
      setIsSeller(false);
      setLoading(false);
      return;
    }

    const checkSeller = async () => {
      try {
        const res = await fetch(`/api/seller/check?userId=${user.id}`);
        const data = await res.json();
        setIsSeller(data.isSeller);
        console.log("Respuesta API checkSeller:", data);
      } catch (error) {
        console.error("Error checking seller:", error);
        setIsSeller(false);
      } finally {
        setLoading(false);
      }
    };

    checkSeller();
  }, [user]);

  return { isSeller, loading };
};
