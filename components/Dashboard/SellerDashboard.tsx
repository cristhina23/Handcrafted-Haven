"use client";

import { useSeller } from "@/contexts/SellerContext";
import WelcomeBanner from "./dashboardHome.tsx/WelcomeBanner";
import CardsContainer from "./dashboardHome.tsx/CardsContainer";
import RevenueAnalytics from "./dashboardHome.tsx/RevenueAnalytics";

export default function SellerDashboard() {
  const { seller, loading, error } = useSeller();

  if (loading) return <div>Loading seller info...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!seller) return <div>No seller profile found.</div>;

  return (
    <div className="p-6 bg-slate-100 dark:bg-slate-900 flex flex-col gap-8">
      <WelcomeBanner />
      <CardsContainer />
      <RevenueAnalytics />
    </div>
  );
}
