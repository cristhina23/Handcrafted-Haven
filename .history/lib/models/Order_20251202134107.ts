import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  sellerId: mongoose.Types.ObjectId;   
  productId: mongoose.Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingCost: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        sellerId: {
          type: Schema.Types.ObjectId,
          ref: "Seller",
          required: true,
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true },
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





export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId; 
  quantity: number;
  priceAtPurchase: number;
  discount: number; 
  discountedPrice: number; // price after discount
  subtotal: number; // discountedPrice * quantity
}

export interface ISellerBreakdown {
  sellerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  shippingCost: number;
  sellerSubtotal: number;
  sellerTax: number;
  sellerTotal: number;
  status: string; // seller-specific status
}

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  sellersBreakdown: ISellerBreakdown[];
  taxRate: number;
  taxTotal: number;
  itemsTotal: number;
  shippingTotal: number;
  grandTotal: number;
  status: string; // overall order status
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  quantity: { type: Number, required: true },
  priceAtPurchase: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  discountedPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const SellerBreakdownSchema = new Schema<ISellerBreakdown>({
  sellerId: { type: Schema.Types.ObjectId, ref: "Seller", required: true },
  items: [OrderItemSchema],
  shippingCost: { type: Number, default: 0 },
  sellerSubtotal: { type: Number, required: true },
  sellerTax: { type: Number, required: true },
  sellerTotal: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],

    sellersBreakdown: [SellerBreakdownSchema],

    taxRate: { type: Number, default: 0 },
    taxTotal: { type: Number, required: true },

    itemsTotal: { type: Number, required: true },
    shippingTotal: { type: Number, required: true },
    grandTotal: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "processing", "partially_shipped", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
 */