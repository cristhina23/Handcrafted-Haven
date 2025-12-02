"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SellerType } from "@/types";

interface Props {
  clerkId: string;
}

export default function DashboardPage({ clerkId }: Props) {
  const { isSignedIn, user } = useUser();
  const [seller, setSeller] = useState<SellerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) return;

    async function fetchSeller() {
      try {
        // Usamos el clerkId recibido como prop
        const res = await fetch(`/api/seller/get-by-clerk?clerkId=${clerkId}`, { cache: "no-store" });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch seller");
        }

        const data = await res.json();
        setSeller(data.seller);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeller();
  }, [isSignedIn, clerkId]);

  if (!isSignedIn) return <div>Please log in</div>;
  if (loading) return <div>Loading seller info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seller) return <div>No seller profile found.</div>;

  return (
    <div className="p-6">
      <h1>Bienvenido, {user?.firstName || user?.fullName} 👋</h1>
      <h2>{seller.shopName}</h2>
      {seller.bio && <p>{seller.bio}</p>}
      <p>País: {seller.country}</p>
      <p>Especialidades: {seller.specialties.join(", ")}</p>
      <p>Rating: {seller.rating}</p>
      <p>Total ventas: {seller.totalSales}</p>
    </div>
  );
}
