import { NewsCleanedFields, PostFieldsCleaned } from "@/app/interfaces";
import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";
import newsMapper from "@/app/lib/webflow/transformers/newsMapper";
import postMapper from "@/app/lib/webflow/transformers/postMapper";
import { db } from "@vercel/postgres";
const client = await db.connect();

async function getCleanNews() {
  const ids = ["Programmes", "People", "Sources","Tags","Events","News" ];
  const results = [];
  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [programmeRaw, peopleRaw, sourcesRaw, tagsRaw,eventsRaw, newsRaw] = results;
  const newsClean = newsRaw.items.map((item) =>
    newsMapper(
        item,
        programmeRaw.items,
        peopleRaw.items,
        sourcesRaw.items,
        tagsRaw.items,
        eventsRaw.items
   
    )
  );
  console.log(newsClean[0]);

  return newsClean;
}

async function populateNewsTable(news: NewsCleanedFields[]) {
  try {
    for (const singleNews of news) {
      // Insert each post into the posts table
      await client.sql`
          INSERT INTO news (webflow_collection_id, webflow_item_id, created_at, updated_at, fieldData, slug)
          VALUES (
            ${singleNews.webflowCollectionId},
            ${singleNews.webflowId},
            ${
              singleNews.createdOn
                ? new Date(singleNews.createdOn).toISOString()
                : new Date().toISOString()
            },
            ${new Date().toISOString()},
            ${JSON.stringify(singleNews)}::JSONB,
            ${singleNews.slug}
          )
          ON CONFLICT DO NOTHING; -- This should be outside VALUES
        `;
    }
    console.log("News table populated successfully.");
  } catch (error: any) {
    console.error("Error populating news table:", error.message);
  }
}

export async function GET() {
  try {
    const news: NewsCleanedFields[] = await getCleanNews();
    console.log("Populating news table...");
    await populateNewsTable(news);
    return new Response(
      JSON.stringify({ message: "News table populated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
