"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import LoadingGlow from "../LoadingGlow";
import DashboardHomeCards from "@/components/UserDashboard/DashboardHomeCards";
import WelcomeBanner from "./dashboardHome/WelcomeBanner";
import CardsContainer from "./dashboardHome/CardsContainer";
import Chart from "./dashboardHome/RevenueAnalytics";
import RevenueByCountry from "./dashboardHome/RevenueByCountry";
import BestSellers from "./dashboardHome/BestSellers";
import LastOrders from "./dashboardHome/LastOrders";

interface Props {
  clerkId?: string;
}

export default function DashboardPage({ clerkId }: Props) {
  const { isSignedIn, user } = useUser();
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);

 
  const checkSeller = async (clerkId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/seller/check?userId=${clerkId}`);
      const data = await res.json();
      setIsSeller(data.isSeller ?? false);
    } catch (error) {
      console.error("Error checking seller:", error);
      setIsSeller(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkSeller(user.id); 
    }
  }, [user?.id]);

  if (!isSignedIn) return <div>Please log in</div>;

  if (loading) return <LoadingGlow />;

  // Vista para seller
  if (isSeller) {
    return (
      <div className="md:p-6 bg-slate-100 dark:bg-slate-900 flex flex-col gap-8 pb-7">
        <WelcomeBanner />
        <CardsContainer />
        <Chart />
        <RevenueByCountry />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[1fr]">
          <div className="flex-1">
            <BestSellers />
          </div>
          <div className="flex-1">
            <LastOrders />
          </div>
        </div>
      </div>
    );
  }

  // Vista para usuario normal
  return (
    <div className="md:p-6 bg-slate-100 dark:bg-slate-900 flex flex-col gap-8 pb-7">
      <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
      <DashboardHomeCards />
    </div>
  );
}
