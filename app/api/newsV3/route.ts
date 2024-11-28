import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10); // Default offset to 0 if not provided
  const limit = 150; // Fixed chunk size

  try {
    const { rows } = await sql`
    SELECT
      fielddata->>'slug' AS "slug",
      fielddata->'thumbnail'->>'url' AS "thumbnailUrl",
      fielddata->'thumbnail'->>'alt' AS "thumbnailAltText",
      fielddata->'sources'->>'name' AS "sourcesName",
      fielddata->'sources'->>'arabicName' AS "sourcesArabicName",
      fielddata->'sources'->>'slug' AS "sourcesSlug",
      fielddata->'sources'->>'url' AS "sourcesUrl",
      fielddata->>'arabicTitle' AS "arabicTitle",
      fielddata->>'name' AS "name",
      fielddata->>'datePublished' AS "datePublished",
      fielddata->>'datePublishedArabic' AS "datePublishedArabic",
      fielddata->'programme'->>'name' AS "programmeName",
      fielddata->'programme'->>'arabicName' AS "programmeArabicName",
      fielddata->'programme'->>'shortname' AS "programmeShortname",
      fielddata->'programme'->>'slug' AS "programmeSlug",
      fielddata->'programme'->>'url' AS "programmeUrl"
    FROM news
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset};
  `;

    const fetchMore = rows.length === limit; // Determine if more data is available (fetchMore = true if full chunk is returned)

    return new Response(JSON.stringify({ rows, fetchMore }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // Prevent caching
        "Access-Control-Allow-Origin": "https://www.communityjameel.org",
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
