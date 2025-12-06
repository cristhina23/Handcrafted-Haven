"use client";

import { useUser } from "@clerk/nextjs";
import SellerDashboard from "./SellerDashboard";
import UserDashboard from "./UserDashboard";

export default function DashboardPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Please log in</div>;

  const role = user.publicMetadata?.role || "user"; 

  if (role === "seller") {
    return <SellerDashboard />;
  }

  return <UserDashboard />;
}
