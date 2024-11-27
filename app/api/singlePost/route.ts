import { sql } from "@vercel/postgres";

async function getPostById(id: string): Promise<any> {
  try {
    const { rows } = await sql`
      SELECT * FROM posts WHERE webflow_item_id = ${id};
    `;

    if (rows.length === 0) {
      throw new Error(`Post with id ${id} not found.`);
    }

    return rows[0]; // Return the first (and only) row
  } catch (error: any) {
    console.error(`Error retrieving post with id ${id}:`, error.message);
    throw new Error(error.message);
  }
}
export async function GET() {


  
    try {
      const post = await getPostById('67444be62a540bf522122704');
  
      return new Response(JSON.stringify({ post }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  }