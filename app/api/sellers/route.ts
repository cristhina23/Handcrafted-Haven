import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Seller } from "@/lib/models/Seller";
import { mostRatedSeller, getActiveSellers, getTrendingArtisans } from "@/lib/db/sellers";
import { getCategories } from "@/lib/db/data";


export async function GET(req:NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    let data;
    if (type) {
      const categories = await getCategories();
      const category: string[] = []
      categories.forEach(element => {
        category.push(element.name)
      });
      switch (type) {
        case "most-rated":
          data = await mostRatedSeller();
          break;
        case "active":
          data = await getActiveSellers();
          break;
        case "trending":
          data = await getTrendingArtisans(category);
          break;
        default:
          return NextResponse.json({ message: "Invalid type" }, { status: 400 });
      }
      return NextResponse.json(data, { status: 200 });
    }

    const sellers = await Seller.find().lean();
    

    return NextResponse.json(sellers);
  } catch (error) {
    console.log("Seller API error", error)
    return NextResponse.json({ message: "Oops! Something went wrong on the server." }, { status: 500 });
  }
}
