const { User } = require("../models/");
import mongoose from "mongoose";
import { connectDB } from "../db/db";

async function migrateFakeUsers() {
  await connectDB();

  const result = await User.updateMany(
    { clerkId: { $exists: false } },
    { $set: { clerkId: "fake_" + Date.now(), role: "user" } }
  );

  console.log(`Usuarios fake actualizados: ${result.modifiedCount}`);
  await mongoose.disconnect();
}

migrateFakeUsers().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
