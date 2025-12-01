"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SellerType } from "@/types";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [seller, setSeller] = useState<SellerType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    console.log(user)
    console.log(user.id)
    console.log(user?.firstName);

    async function fetchSeller() {
      const id = user?.id as string;
      try {
        const res = await fetch(`/api/seller/${id}`, { cache: "no-store" });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch seller");
        }

        const data = await res.json();
        setSeller(data.seller);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeller();
  }, [isSignedIn, user]);

  if (!isSignedIn) return <div>Please log in</div>;
  if (loading) return <div>Loading seller info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seller) return <div>No seller profile found.</div>;

  return (
    <div className="p-6">
      <h1>Bienvenido, {user.firstName || user.fullName} 👋</h1>
      <h2>{seller.shopName}</h2>
      {seller.bio && <p>{seller.bio}</p>}
      <p>País: {seller.country}</p>
      <p>Especialidades: {seller.specialties.join(", ")}</p>
      <p>Rating: {seller.rating}</p>
      <p>Total ventas: {seller.totalSales}</p>
    </div>
  );
}
