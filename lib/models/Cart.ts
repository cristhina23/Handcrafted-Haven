import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sellerId: string;
  sellerName: string;
}

export interface ICart extends Document {
  userId: string; // Clerk user ID
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true }, // Clerk uses strings
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        productImage: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        sellerId: { type: String, required: true },
        sellerName: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
