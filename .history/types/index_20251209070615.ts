// types/index.ts
import { Types } from "mongoose";

export interface LeanCategory {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  description?: string;
}

// ---------- User ----------
export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  image?: string;
  createdAt: string;
}

// ---------- Category ----------
export interface CategoryType {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

// ---------- Seller ----------
export interface SellerType {
  _id: string;
  userId: string;
  shopName: string;
  bio?: string;
  profileImage?: string;
  country: string;
  specialties: string[];
  rating: number;
  totalSales: number;
  reviews: string[];
  createdAt: string;
}

// ---------- Product ----------
export interface VariantType {
  color?: string;
  size?: string;
  material?: string;
}

// types/Product.ts
export interface Variant {
  color?: string;
  size?: string;
  material?: string;
}

export interface Product {
  _id: string;
  sellerId: string;
  sellerName?: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  categoryId: string;
  quantity: number;
  country?: string;
  rating: number;
  ratingCount: number;
  variants?: Variant[];
  isCustomOrder: boolean;
  dimensions?: string;
  shippingMethods: string[];
  createdAt: string;
  updatedAt: string;
  sellerCountry?: string | null;
}

// ---------- Cart ----------
export interface CartItemType {
  productId: string;
  quantity: number;
}

export interface CartType {
  _id: string;
  userId: string;
  items: CartItemType[];
  updatedAt: string;
}

// ---------- Order ----------
export interface IOrderItem {
  productId: Types.ObjectId;
  sellerId: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
  discount?: number; 
  subtotal: number;
}

export interface OrderItemClient {
  productId: string;
  sellerId: string;
  quantity: number;
  priceAtPurchase: number;
  discount?: number;
  subtotal: number;
  price: number;
  productTitle: string;
  productImage: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string; 
}

export interface OrderClient {
  _id: string;
  buyerName: string; 
  buyerImage: string;
  buyerAddress: Address;
  buyerEmail: string;
  buyerPhone?: string;
  shippingMethod: string;
  items: OrderItemClient[];
  total: number;     
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string; 
}

// ---------- Review ----------
export interface ReviewType {
  _id: string;
  productId: string;
  userId: string;
  sellerId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

// ---------- Wishlist ----------
export interface WishlistType {
  _id: string;
  userId: string;
  products: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
}

export interface OrderType {
  _id: string;
  sellerId: string;
  buyerId?: string;
  grandTotal?: number;
  createdAt: Date;
}