"use client";

import { useUser } from "@clerk/nextjs";
import { useSeller } from "@/contexts/SellerContext";
import WelcomeBanner from "./dashboardHome.tsx/WelcomeBanner";
import CardsContainer from "./dashboardHome.tsx/CardsContainer";

interface Props {
  clerkId?: string; 
}

export default function DashboardPage({ clerkId }: Props) {
  const { isSignedIn, user } = useUser();
  const { seller, loading, error } = useSeller();

  if (!isSignedIn) return <div>Please log in</div>;
  if (loading) return <div>Loading seller info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seller) return <div>No seller profile found.</div>;

  return (
    <div className="p-6 bg-slate-100 dark:bg-slate-900">
      <WelcomeBanner />
      <CardsContainer />
      
    </div>
  );
}
