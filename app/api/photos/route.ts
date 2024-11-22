import { getIdByDisplayName } from "@/app/lib/webflow/getByDisplayName";
import { getData } from "@/app/lib/webflow/getData";


export async function GET(request: Request) {
    // Get IDs by display name where needed
   const id =  getIdByDisplayName("Photos")
  
    // Fetch raw data for each collection
    const rawData = await getData(id);
 
  
    // Create JSON objects for the responses
    const rawDataJson = JSON.stringify(rawData);
  
  
    // Combine responses into a single object
  
  
    return new Response(rawDataJson, { status: 200 });
  }
  