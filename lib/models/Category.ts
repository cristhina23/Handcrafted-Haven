import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: String,
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
