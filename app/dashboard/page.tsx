import mongoose from "mongoose";
import { currentUser } from "@clerk/nextjs/server";
import DashboardPage from "@/components/Dashboard/DashboardPage";
import UserDashboard from "@/components/UserDashboard/UserDashboard";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

export default async function Page() {
  const clerkUser = await currentUser();
  if (!clerkUser) return <div>Please sign in</div>;

  await connectDB();

  let seller = null;

  if (mongoose.Types.ObjectId.isValid(clerkUser.id)) {
    seller = await Seller.findOne({ userId: clerkUser.id });
  }

  if (seller) {
    return <DashboardPage clerkId={clerkUser.id} />;
  }

  return <UserDashboard/>;
}
