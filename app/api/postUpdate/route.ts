import { FieldsPostRaw, Item } from "@/app/interfaces";
import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";
import { getTableById } from "@/app/lib/webflow/getTableById";
import postMapper from "@/app/lib/webflow/transformers/postMapper";
import { db } from "@vercel/postgres";
import { table } from "console";

const client = await db.connect();

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

export async function POST(req: Request) {
  try {
    // Parse the request body to JSON
    const body = await req.json();
    const item = body.payload;
    const collectionId = body.collectionId;
    const tableName = getTableById(collectionId);
    const singlePost = await getCleanPost({ item });

    // Log the body to inspect the webhook payload
    console.log("Webhook received from Webflow:", body);
    console.log("Cleaned post data:", singlePost);
   

    // Check if the record already exists
    const existingRecord = await client.sql`
      SELECT * FROM posts WHERE webflow_item_id = ${singlePost.webflowId};
    `;

    if (existingRecord.rows.length > 0) {
      // Update the existing record's slug with originalSlug
      await client.sql`
        UPDATE posts
        SET 
          slug = ${singlePost.originalSlug},
          updated_at = ${new Date().toISOString()},
          field_data = ${JSON.stringify(singlePost)}::JSONB
        WHERE webflow_item_id = ${singlePost.webflowId};
      `;

      // Return a response to acknowledge the webhook
      return new Response(
        JSON.stringify({ success: true, received: body }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // If no record exists, insert the new post
    await client.sql`
      INSERT INTO posts (
        webflow_item_id,
        slug,
        created_at,
        updated_at,
        field_data
      ) VALUES (
        ${singlePost.webflowId},
        ${singlePost.originalSlug},
        ${new Date().toISOString()},
        ${new Date().toISOString()},
        ${JSON.stringify(singlePost)}::JSONB
      );
    `;

    return new Response(
      JSON.stringify({ success: true, received: body }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    // Log any error
    console.error("Error handling Webflow webhook:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
