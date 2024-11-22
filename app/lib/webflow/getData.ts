type FetchResponse = {
  items: any[];
  error?: string;
  fetchTime: number;
};

export async function getData(collection: string): Promise<FetchResponse> {
  const baseUrl = `https://api.webflow.com/v2/collections/${collection}/items`;
  const eventCollection =
    collection === "6225fe8b1f52b40001a99d66" ? true : false;
  const randomString =
    "77bccb4914efbb01038abb013ff6438ae7df5353b5fed8742e89f44ac7441c5a";
  let allItems: any[] = [];
  let offset = 0;
  let fetchMore = true;

  try {
    const startTime = Date.now(); // Capture start time

    while (fetchMore) {
      const response = await fetch(`${baseUrl}?offset=${offset}&limit=100`, {
        next: { revalidate: 360 },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${randomString}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch, status: ${response.status}`);
      }

      const data = await response.json();
      const items = data.items;
      allItems = allItems.concat(items);
      offset += items.length;
      // Filter items with isDraft: true
      allItems = allItems.filter((item) => !item.isDraft);

      // Sort items by datePublished in descending order, placing items without datePublished at the end
      if (eventCollection) {
        allItems.sort((a, b) => {
          const dateA = a.fieldData["event-date"]
            ? new Date(a.fieldData["event-date"]).getTime()
            : 0;
          const dateB = b.fieldData["event-date"]
            ? new Date(b.fieldData["event-date"]).getTime()
            : 0;
          return dateB - dateA;
        });
      }
      if (!eventCollection) {
        allItems.sort((a, b) => {
          const dateA = a.fieldData["date-published"]
            ? new Date(a.fieldData["date-published"]).getTime()
            : 0;
          const dateB = b.fieldData["date-published"]
            ? new Date(b.fieldData["date-published"]).getTime()
            : 0;
          return dateB - dateA;
        });
      }

      // Check if the number of items fetched is less than 100, indicating last page
      fetchMore = items.length === 100;
    }

    const endTime = Date.now(); // Capture end time
    const fetchDuration = (endTime - startTime) / 1000; // Calculate duration in seconds

    return { items: allItems, fetchTime: fetchDuration };
  } catch (error: any) {
    console.error("Error fetching data: ", error);
    return { items: [], error: error.message, fetchTime: 0 };
  }
}
