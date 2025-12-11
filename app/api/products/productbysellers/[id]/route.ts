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
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const {id} = await context.params;
    console.log("Received sellerId:", id);

    const products = await getProductsBySellersId(id);

    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.error("API error from Get sellers products:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
