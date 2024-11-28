import { PostFieldsCleaned } from "@/app/interfaces";
import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";
import postMapper from "@/app/lib/webflow/transformers/postMapper";
import { db } from "@vercel/postgres";
const client = await db.connect();

async function getCleanPosts() {
  const ids = ["Programmes", "People", "Events", "Posts", "Categories"];
  const results = [];
  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [programmeRaw, peopleRaw, eventRaw, postsRaw, categoriesRaw] = results;
  const postsClean = postsRaw.items.map((item) =>
    postMapper(
      item,
      categoriesRaw.items,
      eventRaw.items,
      programmeRaw.items,
      peopleRaw.items
    )
  );

  return postsClean;
}
async function populatePostsTableUpdate(posts: PostFieldsCleaned[]) {
    try {
      for (const singleNews of posts) {
        // Check if the record exists
        const existingRecord = await client.sql`
          SELECT * FROM posts WHERE webflow_item_id = ${singleNews.webflowId};
        `;
  
        if (existingRecord.rows.length > 0) {
          // Update the existing record's slug with originalSlug
          await client.sql`
            UPDATE posts
            SET slug = ${singleNews.originalSlug},
                updated_at = ${new Date().toISOString()},
                field_data = ${JSON.stringify(singleNews)}::JSONB
            WHERE webflow_item_id = ${singleNews.webflowId};
          `;
        } else {
          // Insert new record if it doesn't exist
          await client.sql`
            INSERT INTO posts (webflow_collection_id, webflow_item_id, created_at, updated_at, field_data, slug)
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
              ${singleNews.originalSlug} -- Use originalSlug here
            )
            ON CONFLICT DO NOTHING;
          `;
        }
      }
      console.log("posts table updated successfully.");
    } catch (error: any) {
      console.error("Error updating posts table:", error.message);
    }
  }
  
async function populatePostsTable(posts: PostFieldsCleaned[]) {
  try {
    for (const post of posts) {
      // Insert each post into the posts table
      await client.sql`
          INSERT INTO posts (webflow_collection_id, webflow_item_id, created_at, updated_at, field_data, slug)
          VALUES (
            ${post.webflowCollectionId},
            ${post.webflowId},
            ${
              post.createdOn
                ? new Date(post.createdOn).toISOString()
                : new Date().toISOString()
            },
            ${new Date().toISOString()},
            ${JSON.stringify(post)}::JSONB,
            ${post.originalSlug}
          )
          ON CONFLICT DO NOTHING; -- This should be outside VALUES
        `;
    }
    console.log("Posts table populated successfully.");
  } catch (error: any) {
    console.error("Error populating posts table:", error.message);
  }
}

export async function GET() {
  try {
    const posts: PostFieldsCleaned[] = await getCleanPosts();
    console.log("Populating posts table...");
    await populatePostsTableUpdate(posts);
    return new Response(
      JSON.stringify({ message: "Posts table populated successfully" }),
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
