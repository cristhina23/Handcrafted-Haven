'use client';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      Welcome, {user.firstName}! 👋
      
    </div>
  );
}

