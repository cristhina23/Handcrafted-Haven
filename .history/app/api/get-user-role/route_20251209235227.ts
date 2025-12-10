// pages/api/user/get-role.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { clerkId } = req.query;
  if (!clerkId || typeof clerkId !== "string") {
    return res.status(400).json({ error: "Missing clerkId" });
  }

  try {
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ role: user.role });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
