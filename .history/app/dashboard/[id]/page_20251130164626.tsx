import { useUser } from '@clerk/nextjs';
import React from 'react'

function page() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) return <div>Please log in</div>;

  return (
    <div>
      Welcome, {user.firstName}! 👋
    </div>
  );
}

export default page