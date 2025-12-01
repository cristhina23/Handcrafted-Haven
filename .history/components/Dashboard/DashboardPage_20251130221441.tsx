'use client';
import { useUser } from '@clerk/nextjs';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      collapsed={collapsed} setCollapsed={setCollapsed}
      Welcome, {user.firstName}! 👋
      
    </div>
  );
}

