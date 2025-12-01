'use client';
import { useUser } from '@clerk/nextjs';
import Sidebar from './Sidebar';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      <H
      Welcome, {user.firstName}! 👋
      
    </div>
  );
}

