
import { connectDB } from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: "User ID is required" });

  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ clerkId: userId });

    if (!user) return res.status(404).json({ error: "User not found" });

    const role = user.store ? "seller" : "user";

    return res.status(200).json({ role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
