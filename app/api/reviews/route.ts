import { getReviews } from "@/lib/db/reviews";

export async function GET() {
    const reviews = await getReviews();
    return new Response(JSON.stringify(reviews), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}