"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/user/${user.id}`, { cache: "no-store" });
        const data = await res.json();
        setSeller(data.seller);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [isSignedIn, user]);

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div className="p-6">
      <div>Welcome, {user.firstName}! 👋</div>
      {seller ? (
        <div>
          <h2>Seller Profile</h2>
          <p>Name: {seller.name}</p>
          <p>Email: {seller.email}</p>
          {/* agrega más campos según tu schema */}
        </div>
      ) : (
        <p>Loading seller info...</p>
      )}
    </div>
  );
}
