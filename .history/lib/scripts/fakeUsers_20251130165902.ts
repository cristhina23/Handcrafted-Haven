import { User } from "@/lib/models/User";
import mongoose from "mongoose";
import { connectDB } from "../db/db";

async function migrateFakeUsers() {
  // Conectar a MongoDB
  await connectDB();

  // Actualizar usuarios fake (sin clerkId)
  const result = await User.updateMany(
    { clerkId: { $exists: false } },
    {
      $set: {
        clerkId: "fake_" + Date.now(), 
        role: "user",
      },
    }
  );

  console.log(`Usuarios fake actualizados: ${result.modifiedCount}`);

  // Cerrar conexión
  await mongoose.disconnect();
}

migrateFakeUsers().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});

