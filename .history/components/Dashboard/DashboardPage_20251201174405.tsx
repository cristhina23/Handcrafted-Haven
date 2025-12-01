"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { SellerType } from "@/types";

interface Props {
  clerkId?: string; // opcional, si quieres usar Clerk user id directamente
}

export default function DashboardPage({ clerkId }: Props) {
  const { isSignedIn, user } = useUser();
  

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
