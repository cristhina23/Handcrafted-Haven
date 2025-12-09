import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { User } from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "username is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = (await User.findOne({ username }).lean()) as any;

    if (!user) {
      return NextResponse.json(
        { message: `User "${username}" not found` },
        { status: 404 }
      );
    }

    const hasRequiredFields = Boolean(
      user.username &&
        user.address &&
        user.address.street &&
        user.address.city &&
        user.address.country
    );

    return NextResponse.json({
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      profileCompletedFlag: user.profileCompleted,
      address: {
        street: user.address?.street || null,
        city: user.address?.city || null,
        state: user.address?.state || null,
        zipCode: user.address?.zipCode || null,
        country: user.address?.country || null,
      },
      validation: {
        hasUsername: !!user.username,
        hasAddressObject: !!user.address,
        hasStreet: !!user.address?.street,
        hasCity: !!user.address?.city,
        hasCountry: !!user.address?.country,
      },
      shouldBeComplete: hasRequiredFields,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { message: "Error checking user" },
      { status: 500 }
    );
  }
}
