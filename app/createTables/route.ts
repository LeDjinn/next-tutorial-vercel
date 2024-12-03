import { db } from "@vercel/postgres";

const client = await db.connect();

async function createTable() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      webflow_collection_id TEXT NOT NULL,
      webflow_item_id TEXT NOT NULL,
      slug TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
      field_data JSONB NOT NULL,
      UNIQUE (webflow_collection_id, webflow_item_id)
    );
  `;
  
  console.log("Posts table created successfully.");
}
// async function addSlugColumn() {
//   try {
//     // Check if the column already exists
//     const columnExists = await client.sql`
//       SELECT column_name
//       FROM information_schema.columns
//       WHERE table_name = 'posts' AND column_name = 'slug';
//     `;

//     if (columnExists.rowCount === 0) {
//       // Add the slug column
//       await client.sql`
//         ALTER TABLE posts
//         ADD COLUMN slug TEXT;
//       `;
//       console.log("Slug column added successfully.");
//     } else {
//       console.log("Slug column already exists.");
//     }
//   } catch (error: any) {
//     console.error("Error adding slug column:", error.message);
//   }
// }

export async function GET() {
  try {
    console.log("Creating table..");
    await createTable();
    return new Response(JSON.stringify({ message: "Table events created succesifully " }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
