
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
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Text-to-speech function error:', errorData);
      return new Response(
        JSON.stringify({ success: false, error: errorData.error || 'Failed to generate speech' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const data = await response.json();
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calling text-to-speech function:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
