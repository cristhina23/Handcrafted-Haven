import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
  discount?: number; // opcional
  subtotal: number;
}

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  itemsTotal: number;
  shippingTotal: number;
  grandTotal: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    itemsTotal: { type: Number, default: 0 },
    shippingTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
