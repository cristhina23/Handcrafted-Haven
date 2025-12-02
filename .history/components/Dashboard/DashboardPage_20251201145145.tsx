"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const { isSignedIn, user } = useUser();
  const [seller, setSeller] = useState<any>(null);


   useEffect(() => {
    
      async function fetchData() {
      }
    }, [isSignedIn]);
  if (!isSignedIn) return <div>Please log in</div>;

  return (


        <div className="p-6">
          Welcome, {user.firstName}! 👋
        </div>
      </div>
    
  );
}
