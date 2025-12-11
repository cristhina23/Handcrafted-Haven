import { Review } from "@/lib/models/Review";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { getProductsBySellersId } from "@/lib/db/products";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const params = await context.params;
    const sellerId = params.id;
    console.log("Received sellerId:", sellerId);
    const products = await getProductsBySellersId(sellerId);
    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.log("API error from Get sellers products:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
