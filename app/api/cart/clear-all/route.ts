import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { Cart } from "@/lib/models/Cart";

// DELETE - Limpiar TODOS los carritos (solo para desarrollo)
export async function DELETE() {
  try {
    await connectDB();

    // Eliminar todos los documentos de la colección Cart
    await Cart.deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All carts cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing all carts:", error);
    return NextResponse.json(
      { success: false, message: "Error clearing carts" },
      { status: 500 }
    );
  }
}
