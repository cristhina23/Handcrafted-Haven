"use client";

import { useUser } from "@clerk/nextjs";
import Header from "./Header";

interface DashboardPageProps {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
}

export default function DashboardPage({
  collapsed = false,
  setCollapsed = () => {},
}: DashboardPageProps) {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      Welcome, {user.firstName}! 👋
    </div>
  );
}
