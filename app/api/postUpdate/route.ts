export async function GET(req:any) {
    try {
      // Parse the request body to JSON
      const body = await req.json();
  
      // Log the body to inspect the webhook payload
      console.log('Webhook received from Webflow:', body);
  
      // Return a response to acknowledge the webhook
      return new Response(JSON.stringify({ success: true, received: body }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error:any) {
      // Log any error
      console.error('Error handling Webflow webhook:', error);
  
      // Return an error response
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  