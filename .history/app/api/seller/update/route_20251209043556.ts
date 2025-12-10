import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

export async function PUT(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const updatedSeller = await Seller.findOneAndUpdate(
      { userId: body.userId },  
      {
        shopName: body.shopName,
        bio: body.bio,
        country: body.country,
        profileImage: body.profileImage,
        specialties: body.specialties,
      },
      { new: true }
    );

    return NextResponse.json({ seller: updatedSeller });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update seller" }, { status: 500 });
  }
}
