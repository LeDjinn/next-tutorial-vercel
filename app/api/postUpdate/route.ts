import {
  EventFieldData,
  FieldsPostRaw,
  Item,
  NewsRawFields,
} from "@/app/interfaces";
import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";
import { getTableById } from "@/app/lib/webflow/getTableById";
import eventMapper from "@/app/lib/webflow/transformers/eventMapper";
import newsMapper from "@/app/lib/webflow/transformers/newsMapper";
import postMapper from "@/app/lib/webflow/transformers/postMapper";
import { db } from "@vercel/postgres";

const client = await db.connect();
async function getCleanEvents({ item }: { item: Item<EventFieldData> }) {
  const ids = ["Partners", "Programmes", "People"];
  const results = [];
  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [partnersRaw, programmesRaw, peopleRaw] = results;
  const eventsClean = eventMapper(
    item,
    partnersRaw.items,
    programmesRaw.items,
    peopleRaw.items
  );

  return eventsClean;
}
async function getCleanPost({ item }: { item: Item<FieldsPostRaw> }) {
  const ids = ["Programmes", "People", "Events", "Categories"];
  const results = [];

  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [programmeRaw, peopleRaw, eventRaw, categoriesRaw] = results;
  const postClean = postMapper(
    item,
    categoriesRaw.items,
    eventRaw.items,
    programmeRaw.items,
    peopleRaw.items
  );

  return postClean;
}
async function getCleanNews({ item }: { item: Item<NewsRawFields> }) {
  const ids = ["Programmes", "People", "Sources", "Tags", "Events"];
  const results = [];

  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [programmeRaw, peopleRaw, sourceRaw, tagsRaw, eventsRaw] = results;
  const newsClean = newsMapper(
    item,
    programmeRaw.items,
    peopleRaw.items,
    sourceRaw.items,
    tagsRaw.items,
    eventsRaw.items
  );

  return newsClean;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const payload = body.payload;
    console.log("Payload received:", payload);

    const collectionId = payload.collectionId;
    if (!collectionId) {
      throw new Error("Collection ID is missing from payload.");
    }
    console.log("Collection ID:", collectionId);

    const tableName = getTableById(collectionId);
    console.log("Resolved table name:", tableName);

    if (!tableName) {
      throw new Error(
        `Invalid collectionId or table name not found. Body: ${JSON.stringify(
          body
        )}, Collection ID: ${collectionId}, Table Name: ${tableName}`
      );
    }

    if (payload.isDraft) {
      console.log("Draft detected. Processing draft item...");
    
      switch (tableName) {
        case "news":
          console.log("Checking for draft in the news table...");
          const existingNews = await client.sql`
              SELECT * FROM news WHERE webflow_item_id = ${payload.webflowId};
            `;
          if (existingNews.rows.length > 0) {
            console.log("Draft item exists in news. Deleting...");
            await client.sql`
                DELETE FROM news WHERE webflow_item_id = ${payload.webflowId};
              `;
            return new Response(
              JSON.stringify({
                success: true,
                message: "Draft item deleted successfully from news.",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          } else {
            console.log("Draft item not found in news.");
            return new Response(
              JSON.stringify({
                success: false,
                message: "Draft item not found in the news table.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }
    
        case "posts":
          console.log("Checking for draft in the posts table...");
          const existingPosts = await client.sql`
              SELECT * FROM posts WHERE webflow_item_id = ${payload.webflowId};
            `;
          if (existingPosts.rows.length > 0) {
            console.log("Draft item exists in posts. Deleting...");
            await client.sql`
                DELETE FROM posts WHERE webflow_item_id = ${payload.webflowId};
              `;
            return new Response(
              JSON.stringify({
                success: true,
                message: "Draft item deleted successfully from posts.",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          } else {
            console.log("Draft item not found in posts.");
            return new Response(
              JSON.stringify({
                success: false,
                message: "Draft item not found in the posts table.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }
    
        case "events":
          console.log("Checking for draft in the events table...");
          const existingEvents = await client.sql`
              SELECT * FROM events WHERE webflow_item_id = ${payload.webflowId};
            `;
          if (existingEvents.rows.length > 0) {
            console.log("Draft item exists in events. Deleting...");
            await client.sql`
                DELETE FROM events WHERE webflow_item_id = ${payload.webflowId};
              `;
            return new Response(
              JSON.stringify({
                success: true,
                message: "Draft item deleted successfully from events.",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } }
            );
          } else {
            console.log("Draft item not found in events.");
            return new Response(
              JSON.stringify({
                success: false,
                message: "Draft item not found in the events table.",
              }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }
    
        default:
          console.log(`Unsupported table: ${tableName}`);
          throw new Error(`Unsupported table: ${tableName}`);
      }
    }
    

    let cleanedData;

    switch (tableName) {
      case "news":
        console.log("Processing news collection...");
        cleanedData = await getCleanNews({ item: payload });

        console.log("Checking for existing news record...");
        const existingNewsRecord = await client.sql`
            SELECT * FROM news WHERE webflow_item_id = ${cleanedData.webflowId};
          `;
        console.log("Existing news record:", existingNewsRecord.rows);

        if (existingNewsRecord.rows.length > 0) {
          console.log("Updating existing news record...");
          await client.sql`
              UPDATE news
              SET 
                slug = ${cleanedData.originalSlug},
                updated_at = ${new Date().toISOString()},
                fielddata = ${JSON.stringify(cleanedData)}::JSONB
              WHERE webflow_item_id = ${cleanedData.webflowId};
            `;
        } else {
          console.log("Inserting new news record...");
          await client.sql`
              INSERT INTO news (
                webflow_collection_id,
                webflow_item_id,
                created_at,
                updated_at,
                fielddata,
                slug
              )
              VALUES (
                ${cleanedData.webflowCollectionId},
                ${cleanedData.webflowId},
                ${
                  cleanedData.createdOn
                    ? new Date(cleanedData.createdOn).toISOString()
                    : new Date().toISOString()
                },
                ${new Date().toISOString()},
                ${JSON.stringify(cleanedData)}::JSONB,
                ${cleanedData.originalSlug}
              );
            `;
        }
        break;

      case "posts":
        console.log("Processing posts collection...");
        cleanedData = await getCleanPost({ item: payload });

        console.log("Checking for existing posts record...");
        const existingPostsRecord = await client.sql`
            SELECT * FROM posts WHERE webflow_item_id = ${cleanedData.webflowId};
          `;
        console.log("Existing posts record:", existingPostsRecord.rows);

        if (existingPostsRecord.rows.length > 0) {
          console.log("Updating existing posts record...");
          await client.sql`
              UPDATE posts
              SET 
                slug = ${cleanedData.originalSlug},
                updated_at = ${new Date().toISOString()},
                field_data = ${JSON.stringify(cleanedData)}::JSONB
              WHERE webflow_item_id = ${cleanedData.webflowId};
            `;
        } else {
          console.log("Inserting new posts record...");
          await client.sql`
              INSERT INTO posts (
                webflow_collection_id,
                webflow_item_id,
                created_at,
                updated_at,
                field_data,
                slug
              )
              VALUES (
                ${cleanedData.webflowCollectionId},
                ${cleanedData.webflowId},
                ${
                  cleanedData.createdOn
                    ? new Date(cleanedData.createdOn).toISOString()
                    : new Date().toISOString()
                },
                ${new Date().toISOString()},
                ${JSON.stringify(cleanedData)}::JSONB,
                ${cleanedData.originalSlug}
              );
            `;
        }
        break;
      case "events":
        console.log("Processing events collection...");
        cleanedData = await getCleanEvents({ item: payload });

        console.log("Checking for events posts record...");
        const existingEventsRecord = await client.sql`
              SELECT * FROM events WHERE webflow_item_id = ${cleanedData.webflowId};
            `;
        console.log("Existing event record:", existingEventsRecord.rows);

        if (existingEventsRecord.rows.length > 0) {
          console.log("Updating existing events record...");
          await client.sql`
                UPDATE events
                SET 
                  slug = ${cleanedData.originalSlug},
                  updated_at = ${new Date().toISOString()},
                  field_data = ${JSON.stringify(cleanedData)}::JSONB
                WHERE webflow_item_id = ${cleanedData.webflowId};
              `;
        } else {
          console.log("Inserting new event record...");
          await client.sql`
                INSERT INTO events (
                  webflow_collection_id,
                  webflow_item_id,
                  created_at,
                  updated_at,
                  field_data,
                  slug
                )
                VALUES (
                  ${cleanedData.webflowCollectionId},
                  ${cleanedData.webflowId},
                  ${
                    cleanedData.createdOn
                      ? new Date(cleanedData.createdOn).toISOString()
                      : new Date().toISOString()
                  },
                  ${new Date().toISOString()},
                  ${JSON.stringify(cleanedData)}::JSONB,
                  ${cleanedData.originalSlug}
                );
              `;
        }
        break;

      default:
        console.log(`Unsupported table: ${tableName}`);
        throw new Error(`Unsupported table: ${tableName}`);
    }

    console.log("Record processed successfully.");
    return new Response(
      JSON.stringify({
        success: true,
        message: "Record processed successfully.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error handling Webflow webhook:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
