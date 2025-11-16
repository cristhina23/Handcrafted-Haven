import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    images: [String],
  },
  { timestamps: true }
);

export const Review =
  mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
