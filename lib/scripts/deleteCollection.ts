import mongoose from "mongoose";
import { connectDB } from "@/lib/db/db";

async function clearCollection() {
  try {
    await connectDB();

    const client = mongoose.connection.getClient();
    const db = client.db();

    await db.collection("reviews").deleteMany({});

    console.log("Collection 'reviews' has been cleared.");
    process.exit(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

clearCollection();


