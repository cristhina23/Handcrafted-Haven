"use client";

import { useUser } from "@clerk/nextjs";
import { useSeller } from "@/contexts/SellerContext";
import WelcomeBanner from "./dashboardHome/WelcomeBanner"
import CardsContainer from "./dashboardHome/CardsContainer"
import Chart from "./dashboardHome/RevenueAnalytics"
import RevenueByCountry from "./dashboardHome/RevenueByCountry"
import BestSellers from "./dashboardHome/BestSellers";
import LastOrders from "./dashboardHome/LastOrders";

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
    <div className=" md:p-6 bg-slate-100 dark:bg-slate-900 flex flex-col gap-8 pb-7">
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
