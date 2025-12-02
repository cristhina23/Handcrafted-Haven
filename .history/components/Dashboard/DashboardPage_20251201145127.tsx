"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [seller, setSeller] = useState<any>(null);


   useEffect(() => {
    
      async function fetchData() {

  if (!isSignedIn) return <div>Please log in</div>;

  return (

  useEffect(() => {
    async function fetchSellerData() {
      if (!isSignedIn) return;

      try {
        const response = await fetch(`/api/seller?clerkId=${currentUser?.id}`);
        const data = await response.json();
        setSellerData(data);
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    }

    fetchSellerData();
  }, [isSignedIn, currentUser]);


        <div className="p-6">
          Welcome, {user.firstName}! 👋
        </div>
      </div>
      <div className="p-6">
        Welcome, {currentUser?.firstName}!
    
  );
}
