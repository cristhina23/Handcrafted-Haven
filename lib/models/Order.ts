import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingCost: number;
  total: number;
  status: string; // pending, processing, shipped, delivered
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        priceAtPurchase: Number,
      },
    ],
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
