import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10); // Default offset to 0 if not provided
  const limit = 100; // Fixed chunk size of 10 rows

  try {
    const { rows } = await sql` SELECT * FROM events
  ORDER BY (field_data->>'eventDate')::TIMESTAMP DESC
  LIMIT ${limit}
  OFFSET ${offset};`;

    const fetchMore = rows.length === limit; // Determine if more data is available (fetchMore = true if full chunk is returned)
    const rowsLength = rows.length;
    return new Response(JSON.stringify({ rows, fetchMore, rowsLength }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
        "Access-Control-Allow-Origin": "https://www.communityjameel.org",
      },
    });
  } catch (error: any) {
    console.error("Error fetching events:", error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}
