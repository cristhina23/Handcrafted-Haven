import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image?: string;
  description?: string;
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true},
  description: String,
});

export const Category =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
