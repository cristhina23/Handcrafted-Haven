import { connectDB } from "@/lib/db/db";
import { Product } from "@/lib/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    console.log("ID received:", id);

    const product = await Product.findById(id)
      .populate("sellerId", "shopName country")
      .populate("categoryId", "name")
      .lean();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", id },
        { status: 404 }
      );
    }

    const reviews = await Review.find({
      productId: new mongoose.Types.ObjectId(id),
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    return NextResponse.json({ product, reviews });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
