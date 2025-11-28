import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

export async function GET() {
  try {
    await connectDB();

    const sellers = await Seller.find().lean();
    const countries = Array.from(new Set(sellers.map((s) => s.country).filter(Boolean)));

    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch seller countries" }, { status: 500 });
  }
}
