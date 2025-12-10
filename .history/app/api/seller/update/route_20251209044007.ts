import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { getSellerFromAuth } from "@/lib/helpers/getSeller";

export async function PUT(req: Request) {
  try {
    await connectDB();

    const { seller, error, status } = await getSellerFromAuth();
    if (error) return NextResponse.json({ error }, { status });

    const body = await req.json();

    const updated = await Seller.findByIdAndUpdate(
      seller._id,
      body,
      { new: true }
    );

    return NextResponse.json({ seller: updated });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update seller" },
      { status: 500 }
    );
  }
}
