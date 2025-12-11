import mongoose, { Schema, Document } from "mongoose";

export interface IVariant {
  color?: string;
  size?: string;
  material?: string;
}

export interface IProduct extends Document {
  sellerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: mongoose.Types.ObjectId;
  quantity: number;
  country?: string;
  rating: number;
  ratingCount: number;
  variants?: IVariant[];
  isCustomOrder: boolean;
  dimensions?: string;
  shippingMethods: string[];
  reviews?: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: { type: Number, default: 0 },
    country: { type: String },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    variants: [
      {
        color: String,
        material: String,
      },
    ],
    isCustomOrder: { type: Boolean, default: false },
    dimensions: String,
    shippingMethods: [String],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // <-- Agregado para población
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
