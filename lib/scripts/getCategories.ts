import { connectDB } from "../db/db";
import { Category } from "@/lib/models/Category";
import { LeanCategory } from "@/types";

export async function getCategories(): Promise<
  (Omit<LeanCategory, "_id"> & { _id: string })[]
> {
  await connectDB();

  const categories = await Category.find().lean<LeanCategory[]>();

  return categories.map((c) => ({
    ...c,
    _id: c._id.toString(), // Convert ObjectId to string
  }));
}
