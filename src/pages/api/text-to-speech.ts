
// This is a client-side API route for invoking the Supabase Edge Function
export async function POST(request: Request) {
  const { text, voiceId, model, language } = await request.json();
  
  try {
    console.log(`Calling text-to-speech function with voiceId: ${voiceId}, language: ${language || 'en'}, text length: ${text.length}`);
    
    const response = await fetch(
      'https://kqccayfzcxuadkzohgzs.supabase.co/functions/v1/text-to-speech',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY2NheWZ6Y3h1YWRrem9oZ3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDU0NzQsImV4cCI6MjA1ODY4MTQ3NH0.voJsuUs1noG3SGq97VSIFhuVXC0SK-Z99CjJMRlY3I0'}`,
        },
        body: JSON.stringify({ text, voiceId, model, language }),
      }
    );
    
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
