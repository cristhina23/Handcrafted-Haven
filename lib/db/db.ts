import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL as string;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is missing in .env.local");
}

const connection: { isConnected?: number } = {};

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // Solo loguea una vez si quieres, o elimina el log para evitar spam
    // console.log("MongoDB already connected");
    return;
  }

  if (mongoose.connection.readyState === 2) {
    // 2 = connecting, espera a que termine
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL);
    // Solo loguea una vez
    if (!connection.isConnected) {
      console.log("MongoDB connected successfully");
      connection.isConnected = 1;
    }
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw new Error("MongoDB connection failed");
  }
};
