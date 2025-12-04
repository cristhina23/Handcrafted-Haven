import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    // Buscar seller POR SU _ID (el que usa el producto)
    const seller = await Seller.findById(id);

    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
