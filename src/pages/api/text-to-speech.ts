
// This is a client-side API route for invoking the Supabase Edge Function
export async function POST(request: Request) {
  const { text, voiceId, model, language } = await request.json();
  
  try {
    console.log(`Calling text-to-speech function with voiceId: ${voiceId}, language: ${language || 'en'}, text length: ${text.length}`);
    
    // Make sure the URL and auth is correctly formatted
    const supabaseUrl = 'https://kqccayfzcxuadkzohgzs.supabase.co/functions/v1/text-to-speech';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2NheWZ6Y3h1YWRrem9oZ3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDU0NzQsImV4cCI6MjA1ODY4MTQ3NH0.voJsuUs1noG3SGq97VSIFhuVXC0SK-Z99CjJMRlY3I0';
    
    console.log(`Making request to: ${supabaseUrl}`);
    
    const response = await fetch(
      supabaseUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ text, voiceId, model, language }),
      }
    );
    
    // Improved error handling for the response
    if (!response.ok) {
      console.error(`Supabase function error: Status ${response.status}`);
      
      // Try to extract meaningful error information
      const contentType = response.headers.get('content-type');
      let errorDetail = '';
      
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorDetail = JSON.stringify(errorJson);
          console.error('Error details:', errorDetail);
          
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: errorJson.error || `API error (${response.status})` 
            }),
            { status: response.status, headers: { 'Content-Type': 'application/json' } }
          );
        } else {
          const errorText = await response.text();
          errorDetail = errorText.substring(0, 200);
          console.error('Error response:', errorDetail);
          
          return new Response(
            JSON.stringify({ 
              success: false, 
              error: `Received invalid response format: ${contentType || 'unknown'}, status: ${response.status}` 
            }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (parseError) {
        errorDetail = `Failed to parse error response: ${parseError.message}`;
        console.error(errorDetail);
        
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `API response error: ${errorDetail}` 
          }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Handle non-JSON responses better
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Attempt to get text response for better debugging
      let errorText = '';
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = 'Could not read response body';
      }
      console.error('Non-JSON response from function:', errorText.substring(0, 200));
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Invalid response format from API: ${contentType || 'unknown'}, status: ${response.status}`,
          debug: errorText.substring(0, 500)
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    
    // If the edge function returned an error
    if (!data.success) {
      console.error('Edge function returned error:', data.error);
      return new Response(
        JSON.stringify({ success: false, error: data.error || 'Unknown error from speech service' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify(data),
      { status: response.status, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calling text-to-speech function:', error);
    return new Response(
      JSON.stringify({ success: false, error: `API request failed: ${error.message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
