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
      const body = await req.json();
      const { payload, collectionId } = body;
  
      // Check if `isDraft` is true; if so, skip processing
      if (payload.isDraft) {
        return new Response(
          JSON.stringify({ success: false, message: "Drafts are not processed." }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
  
      // Get the dynamic table name
      const tableName = 'posts';
      if (!tableName) {
        throw new Error(`Invalid collectionId or table name not found this is the nanme of the table posts.`);
      }
  
      // Fetch and clean post data
      const singlePost = await getCleanPost({ item: payload });
  
      // Check if the record exists in the database
      const existingRecord = await client.sql`
        SELECT * FROM posts WHERE webflow_item_id = ${singlePost.webflowId};
      `;
  
      if (existingRecord.rows.length > 0) {
        // Update the existing record
        await client.sql`
          UPDATE posts
          SET 
            slug = ${singlePost.originalSlug},
            updated_at = ${new Date().toISOString()},
            field_data = ${JSON.stringify(singlePost)}::JSONB
          WHERE webflow_item_id = ${singlePost.webflowId};
        `;
      } else {
        // Insert a new record
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
            ${singlePost.webflowCollectionId},
            ${singlePost.webflowId},
            ${
              singlePost.createdOn
                ? new Date(singlePost.createdOn).toISOString()
                : new Date().toISOString()
            },
            ${new Date().toISOString()},
            ${JSON.stringify(singlePost)}::JSONB,
            ${singlePost.originalSlug}
          );
        `;
      }
  
      // Return success response
      return new Response(
        JSON.stringify({ success: true, message: "Record processed successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error: any) {
      // Handle and log errors
      console.error("Error handling Webflow webhook:", error);
  
      return new Response(
        JSON.stringify({ success: false, error: error.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  
