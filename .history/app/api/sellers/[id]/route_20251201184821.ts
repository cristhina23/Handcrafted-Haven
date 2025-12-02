import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectDB();
    const { id } = params;

    // Buscar seller POR SU _ID (el que usa el producto)
    const seller = await Seller.findById(id);

    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
