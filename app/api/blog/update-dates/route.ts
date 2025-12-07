import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { BlogPost } from "@/lib/models/BlogPost";

// Fechas distribuidas a lo largo del año 2024-2025
const postDates = [
  new Date("2024-08-15T10:00:00Z"), // Post 1 - Agosto 2024
  new Date("2024-09-20T14:30:00Z"), // Post 2 - Septiembre 2024
  new Date("2024-10-05T09:15:00Z"), // Post 3 - Octubre 2024
  new Date("2024-10-18T16:45:00Z"), // Post 4 - Octubre 2024
  new Date("2024-11-02T11:20:00Z"), // Post 5 - Noviembre 2024
  new Date("2024-11-15T13:00:00Z"), // Post 6 - Noviembre 2024
  new Date("2024-11-28T10:30:00Z"), // Post 7 - Noviembre 2024
  new Date("2024-12-03T15:45:00Z"), // Post 8 - Diciembre 2024
  new Date("2024-12-12T09:00:00Z"), // Post 9 - Diciembre 2024
  new Date("2024-12-20T14:15:00Z"), // Post 10 - Diciembre 2024
  new Date("2025-01-08T11:30:00Z"), // Post 11 - Enero 2025
  new Date("2025-01-22T16:00:00Z"), // Post 12 - Enero 2025
  new Date("2025-02-05T10:45:00Z"), // Post 13 - Febrero 2025
  new Date("2025-02-14T13:20:00Z"), // Post 14 - Febrero 2025
  new Date("2025-03-01T09:30:00Z"), // Post 15 - Marzo 2025
  new Date("2025-03-18T15:00:00Z"), // Post 16 - Marzo 2025
  new Date("2025-04-10T11:15:00Z"), // Post 17 - Abril 2025
  new Date("2025-05-05T14:30:00Z"), // Post 18 - Mayo 2025
  new Date("2025-11-20T10:00:00Z"), // Post 19 - Noviembre 2025
  new Date("2025-12-01T16:45:00Z"), // Post 20 - Diciembre 2025
];

export async function POST() {
  try {
    await connectDB();

    // Obtener todos los posts ordenados por _id (orden de creación original)
    const posts = await BlogPost.find().sort({ _id: 1 });

    if (posts.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No posts found. Please seed the database first.",
      });
    }

    // Actualizar cada post con su fecha correspondiente
    const updatePromises = posts.map((post, index) => {
      const dateIndex = index % postDates.length; // En caso de que haya más posts que fechas
      return BlogPost.findByIdAndUpdate(post._id, {
        createdAt: postDates[dateIndex],
        updatedAt: postDates[dateIndex],
      });
    });

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: `Updated ${posts.length} blog posts with new dates`,
      updatedCount: posts.length,
    });
  } catch (error) {
    console.error("Error updating blog post dates:", error);
    return NextResponse.json(
      { success: false, message: "Error updating blog post dates" },
      { status: 500 }
    );
  }
}
