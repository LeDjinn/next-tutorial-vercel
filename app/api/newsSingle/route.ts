import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug"); // Get the slug from query params

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { rows } = await sql`
      SELECT *
      FROM news
      WHERE slug = ${slug}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "News not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
      },
    });
  } catch (error: any) {
    console.error("Error fetching news by slug:", error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}