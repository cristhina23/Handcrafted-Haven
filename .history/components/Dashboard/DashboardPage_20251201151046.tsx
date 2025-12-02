"use client";

import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const currentUser = user;

    async function fetchSeller() {
      try {
        const res = await fetch(`/api/dashboard?clerkId=${currentUser.id}`, { cache: "no-store" });
        const data = await res.json();
        setSeller(data.seller);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSeller();
  }, [isSignedIn, user]);

  if (!isSignedIn) return <div>Please log in</div>;
  if (!seller) return <div>Loading seller info...</div>;

  return (
    <div className="p-6">
      <h1>Bienvenido, {currentUser.fisrstName} 👋</h1>
      <h2>{seller.shopName}</h2>
      <p>{seller.bio}</p>
      <p>País: {seller.country}</p>
      <p>Especialidades: {seller.specialties.join(", ")}</p>
      <p>Rating: {seller.rating}</p>
      <p>Total ventas: {seller.totalSales}</p>
    </div>
  );
}
