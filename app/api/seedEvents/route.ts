import { EventFieldDataCleaned} from "@/app/interfaces";
import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";
import eventMapper from "@/app/lib/webflow/transformers/eventMapper";

import { db } from "@vercel/postgres";
const client = await db.connect();

async function getCleanEvents() {
  const ids = ["Events","Partners","Programmes","People"];
  const results = [];
  for (const id of ids) {
    const data = await getData(getIdByDisplayName(id));
    results.push(data);
  }

  const [eventsRaw,partnersRaw,programmesRaw, peopleRaw] = results;
  const eventsClean = eventsRaw.items.map((item) =>
    eventMapper(
        item,
        partnersRaw.items,
        programmesRaw.items,
        peopleRaw.items,
    
   
    )
  );
  

  return eventsClean;
}
async function populateEventsTableUpdate(events: EventFieldDataCleaned []) {
    try {
      for (const singleEvent of events) {
        // Check if the record exists
        const existingRecord = await client.sql`
          SELECT * FROM events WHERE webflow_item_id = ${singleEvent.webflowId};
        `;
  
        if (existingRecord.rows.length > 0) {
          // Update the existing record's slug with originalSlug
          await client.sql`
            UPDATE events
            SET slug = ${singleEvent.originalSlug},
                updated_at = ${new Date().toISOString()},
                field_data = ${JSON.stringify(singleEvent)}::JSONB
            WHERE webflow_item_id = ${singleEvent.webflowId};
          `;
        } else {
          // Insert new record if it doesn't exist
          await client.sql`
            INSERT INTO events (webflow_collection_id, webflow_item_id, created_at, updated_at, field_data, slug)
            VALUES (
              ${singleEvent.webflowCollectionId},
              ${singleEvent.webflowId},
              ${
                singleEvent.createdOn
                  ? new Date(singleEvent.createdOn).toISOString()
                  : new Date().toISOString()
              },
              ${new Date().toISOString()},
              ${JSON.stringify(singleEvent)}::JSONB,
              ${singleEvent.originalSlug} -- Use originalSlug here
            )
            ON CONFLICT DO NOTHING;
          `;
        }
      }
      console.log("Events table updated successfully.");
    } catch (error: any) {
      console.error("Error updating events table:", error.message);
    }
  }
  
async function populateEventsTable(events: EventFieldDataCleaned[]) {
  try {
    for (const singleEvent of events) {
      // Insert each post into the posts table
      await client.sql`
          INSERT INTO events(webflow_collection_id, webflow_item_id, created_at, updated_at, field_data, slug)
          VALUES (
            ${singleEvent.webflowCollectionId},
            ${singleEvent.webflowId},
            ${
              singleEvent.createdOn
                ? new Date(singleEvent.createdOn).toISOString()
                : new Date().toISOString()
            },
            ${new Date().toISOString()},
            ${JSON.stringify(singleEvent)}::JSONB,
            ${singleEvent.originalSlug}
          )
          ON CONFLICT DO NOTHING; -- This should be outside VALUES
        `;
    }
    console.log("Events table populated successfully.");
  } catch (error: any) {
    console.error("Error populating Events table:", error.message);
  }
}

export async function GET() {
  try {
    const events: EventFieldDataCleaned[] = await getCleanEvents();
    console.log("Updating events table...");
    await populateEventsTable(events);
    return new Response(
      JSON.stringify({ message: "Events table populated successfully" }),
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
