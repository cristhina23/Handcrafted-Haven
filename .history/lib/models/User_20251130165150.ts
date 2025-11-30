import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // ID de Clerk (requerido)
  email: string;
  fullName: string;
  username?: string; // Nombre de usuario único
  phone?: string;
  image?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  profileCompleted: boolean; 
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, // Único pero opcional
    phone: { type: String },
    image: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
