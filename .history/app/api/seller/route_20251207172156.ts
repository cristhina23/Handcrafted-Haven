import mongoose, { Schema, Document } from "mongoose";

export interface ISeller extends Document {
  userId: mongoose.Types.ObjectId;
  shopName: string;
  bio?: string;
  profileImage?: string;
  country: string;
  specialties: string[];
  rating: number;
  totalSales: number;
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const SellerSchema = new Schema<ISeller>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    shopName: { type: String, required: true },
    bio: String,
    profileImage: String,
    country: String,
    specialties: [String],
    rating: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export const Seller =
  mongoose.models.Seller || mongoose.model<ISeller>("Seller", SellerSchema);
