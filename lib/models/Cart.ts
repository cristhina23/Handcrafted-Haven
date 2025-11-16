import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

export const Cart =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
