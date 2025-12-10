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
    const seller = await Seller.findById(id).populate(
      {
        path: "userId",
        select: "fullName image",
      }
    );

    if (!seller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    console.error("Error fetching seller:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
