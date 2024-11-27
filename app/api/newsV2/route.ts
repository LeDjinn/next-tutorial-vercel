import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10); // Default offset to 0 if not provided
  const limit = 150; // Fixed chunk size of 10 rows

  try {
    const { rows } = await sql`
      SELECT * FROM news ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset};
    `;

    const fetchMore = rows.length === limit; // Determine if more data is available (fetchMore = true if full chunk is returned)

    return new Response(JSON.stringify({ rows, fetchMore }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
    });
  } catch (error: any) {
    console.error("Error fetching news:", error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
