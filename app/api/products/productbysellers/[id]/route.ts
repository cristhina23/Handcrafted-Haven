/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { getProductsBySellersId } from "@/lib/db/products";

interface RouteContext {
    params: {
        id: string;
    };
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();

    const sellerId = context.params.id;
    console.log("Received sellerId:", sellerId);

    const products = await getProductsBySellersId(sellerId);

    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.error("API error from Get sellers products:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
