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
            ${post.slug}
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
    await populatePostsTable(posts);
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
