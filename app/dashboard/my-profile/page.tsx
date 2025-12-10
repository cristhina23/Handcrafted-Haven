import { currentUser } from "@clerk/nextjs/server";
import UserProfilePage from "@/components/UserDashboard/UserProfilePage";

export default function Page() {
  const user = currentUser();
  if (!user) return <div>Please sign in</div>;

  return <UserProfilePage/>;
}
