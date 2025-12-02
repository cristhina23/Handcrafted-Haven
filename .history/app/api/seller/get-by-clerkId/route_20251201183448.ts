export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");
    console.log("clerkId recibido:", clerkId); // <-- depuración

    if (!clerkId) {
      return NextResponse.json({ error: "clerkId required" }, { status: 400 });
    }

    const user = await User.findOne({ clerkId });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const seller = await Seller.findOne({ userId: user._id }).lean();
    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    return NextResponse.json({ seller }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
